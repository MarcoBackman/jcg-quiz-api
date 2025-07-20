import { Injectable } from '@nestjs/common';
import { QuizQuestionResponse } from './dp.response';
import { AiApiService } from '../ai-service/ai-api.service'
import { DbArchitechingPrompt, IntegrationTestPrompt,
   DesignPatternPrompt, ModuleCouplingCohesionPrompt, 
   SoftwareDiagramPrompt, SoftwareDevelopmentModelPrompt,
   TestingPrompt}
 from '../ai-service/prompt/jch-prompt-short-anwser';
import {JCG_TOPIC} from '../type/jcg-topic-enum';
import * as _ from 'lodash';


//정보처리기사 퀴즈 서비스
@Injectable()
export class JcgQuizService {

  private readonly defaultLanguage = 'Korean'
  private readonly defaultLevel = 'medium'

  private generationConfigForTopics = { // Use a specific config for topic generation
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      responseMimeType: "application/json"
      // NO responseSchema HERE for simple array output
  };

  private generationConfigForQuizzes = { // You might have another config for quiz generation
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      responseMimeType: "application/json",
      responseSchema: { // This is where your questions schema should live
          type: 'OBJECT',
          properties: {
              questions: {
                  type: 'ARRAY',
                  items: {
                      type: 'OBJECT',
                      properties: {
                          correctAnswer: { type: 'STRING' },
                          description: { type: 'STRING' },
                          explanation: { type: 'STRING' },
                          id: { type: 'STRING' },
                          questionText: { type: 'STRING' }
                      },
                      required: ['correctAnswer', 'description', 'explanation', 'id', 'questionText']
                  }
              }
          },
          required: ['questions']
      }
  };

  constructor(private readonly aiApiService: AiApiService) {

  }

  //form prompt for ai api - short answer
  generationConfig = {
    responseMimeType: "application/json",
    responseSchema: {
        type: "OBJECT",
        properties: {
            "questions": {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        "id": { "type": "STRING" },
                        "questionText": { "type": "STRING" },
                        "description": { "type": "STRING" },
                        "correctAnswer": { "type": "STRING" },
                        "explanation": { "type": "STRING" }
                    },
                    "required": ["id", "questionText", "description", "correctAnswer", "explanation"]
                }
            }
        },
        "required": ["questions"]
    }
  };

  getTopics(topic: JCG_TOPIC, language: string) {
    var prompt: string
    switch(topic) {
      case JCG_TOPIC.DB_ARCHITECTURE: {
        prompt = DbArchitechingPrompt.getDbArchitechTopics(language);
        break;
      }
      case JCG_TOPIC.DESIGN_PATTERN: {
        prompt = DesignPatternPrompt.getDesignPatternTopics(language);
        break;
      }
      case JCG_TOPIC.SOFTWARE_DIAGRAM: {
        prompt = SoftwareDiagramPrompt.getSoftwareDiagramTopics(language);
        break;
      }
      case JCG_TOPIC.INTEGRATION_TEST: {
        prompt = IntegrationTestPrompt.getIntegrationTestTopics(language);
        break;
      }
      case JCG_TOPIC.MODULE_COUPLING_COHESION: {
        prompt = ModuleCouplingCohesionPrompt.getModuleCouplingCohesionTopics(language);
        break;
      }
      case JCG_TOPIC.SOFTWARE_DEVELOPMENT_MODEL: {
        prompt = SoftwareDevelopmentModelPrompt.getSoftwareDevelopmentModelTopics(language);
        break;
      }
      case JCG_TOPIC.TESTING_TYPES: {
        prompt = TestingPrompt.getTestingTopics(language);
        break;
      }
      default: {
        throw new Error(`Unsupported JCG_TOPIC: '${topic}'. Please provide a valid topic.`);
      }
    }
    return prompt;
  }

  generatePrompt(
      topics: Array<string>,
      numberOfQuestions : number,
      difficulty : string | undefined,
      language : string | undefined,
      topic : JCG_TOPIC):string {

    if (difficulty === undefined) {
      difficulty = this.defaultLevel;
    }

    if (language === undefined) {
      language = this.defaultLanguage
    }
    
    switch(topic) {
      case JCG_TOPIC.DB_ARCHITECTURE: {
        return DbArchitechingPrompt.getKeywordBasePromptMessage(topics, numberOfQuestions, difficulty, language);
      }
      case JCG_TOPIC.DESIGN_PATTERN: {
        return DesignPatternPrompt.getKeywordBasePromptMessage(topics, numberOfQuestions, difficulty, language);
      }
      case JCG_TOPIC.SOFTWARE_DIAGRAM: {
        return SoftwareDiagramPrompt.getKeywordBasePromptMessage(topics, numberOfQuestions, difficulty, language);
      }
      case JCG_TOPIC.INTEGRATION_TEST: {
        return IntegrationTestPrompt.getKeywordBasePromptMessage(topics, numberOfQuestions, difficulty, language);
      }
      case JCG_TOPIC.MODULE_COUPLING_COHESION: {
        return ModuleCouplingCohesionPrompt.getKeywordBasePromptMessage(topics, numberOfQuestions, difficulty, language);
      }
      case JCG_TOPIC.SOFTWARE_DEVELOPMENT_MODEL: {
        return SoftwareDevelopmentModelPrompt.getKeywordBasePromptMessage(topics, numberOfQuestions, difficulty, language);
      }
      case JCG_TOPIC.TESTING_TYPES: {
        return TestingPrompt.getKeywordBasePromptMessage(topics, numberOfQuestions, difficulty, language);
      }
      default: {
        throw new Error(`Unsupported JCG_TOPIC: '${topic}'. Please provide a valid topic.`);
      }
    }
  }

  async generateShortAnswerQuiz(
    numberOfQuestions : number,
     difficulty : string | undefined,
      language : string | undefined,
      topic : JCG_TOPIC): Promise<QuizQuestionResponse[]> {

    const quizId = `quiz_session_${Date.now()}`;

    let keywords = await this.getCetegoryAnswers(topic, language);
    const originalKeywordsPool = [...keywords]; //keep a copy

    //shuffle keywords (Fisher-Yates (Knuth) shuffle)
    for (let i = keywords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      //swap
      [keywords[i], keywords[j]] = [keywords[j], keywords[i]];
    }

    let finalKeywords: string[] = [];

    if (numberOfQuestions < keywords.length) {
      finalKeywords = keywords.slice(0, numberOfQuestions);
    } else {
      finalKeywords = [...keywords];

      const neededMore = numberOfQuestions - finalKeywords.length;

      if (neededMore > 0) { // Option 1: Using Lodash's _.sampleSize (recommended if Lodash is already used)
        if (typeof _ !== 'undefined' && _.sampleSize) {
          const additionalKeywords = _.sampleSize(originalKeywordsPool, neededMore);
          finalKeywords = finalKeywords.concat(additionalKeywords);
        } else { // Option 2: Manual random selection if Lodash is not used or preferred
          const additionalKeywords: string[] = [];
          for (let k = 0; k < neededMore; k++) {
            const randomIndex = Math.floor(Math.random() * originalKeywordsPool.length);
            additionalKeywords.push(originalKeywordsPool[randomIndex]);
          }
          finalKeywords = finalKeywords.concat(additionalKeywords);
        }
      }
    }

    const prompt = this.generatePrompt(finalKeywords, numberOfQuestions, difficulty, language, topic);

    // Use the injected AiApiService to call the Gemini API
    const aiResponse = await this.aiApiService.callGeminiApi(prompt, this.generationConfig);

    const questions: QuizQuestionResponse[] = aiResponse.questions.map((q: any) => ({
      id: quizId + q.id,
      questionText: q.questionText,
      description: q.description,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    }));

    return questions;
  }

  async getCetegoryAnswers(topic: JCG_TOPIC, language: string = this.defaultLanguage) : Promise<Array<string>> {
    let systemInstruction: string = `Always respond STRICTLY in JSON format as specified in the user prompt. DO NOT include any conversational filler, introductory text, or concluding remarks.`;

    let prompt = this.getTopics(topic, language);
    
    // Crucial: Use the correct generationConfig
    console.log(`[JchQuizService] Using generationConfig: \n`, JSON.stringify(this.generationConfigForTopics, null, 2));

    try {
        // Pass the specific generationConfig for topics
        const aiResponse = await this.aiApiService.callGeminiApi(
            prompt,
            this.generationConfigForTopics, // <-- Use the config without responseSchema for topics
            systemInstruction
        );
        console.log("[JchQuizService] AI Raw Response:", aiResponse);

        // Expecting an array directly, not an object { topics: [] }
        // So, validate and return
        if (Array.isArray(aiResponse)) {
            return aiResponse;
        } else {
            console.error("AI API returned unexpected non-array format for topics:", aiResponse);
            throw new Error("AI API did not return the expected array of topics.");
        }

    } catch (error) {
        console.error("[JchQuizService] Error getting category answers:", error.response?.data || error.message);
        throw error;
    }
  }
}
