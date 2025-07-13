import { Injectable } from '@nestjs/common';
import { QuizQuestionResponse } from './dp.response';
import { AiApiService } from '../ai-service/ai-api.service'
import { DbArchitechingPrompt, IntegrationTestPrompt,
   DesignPatternPrompt, ModuleCouplingCohesionPrompt, 
   SoftwareDiagramPrompt, SoftwareDevelopmentModelPrompt,
   TestingPrompt}
 from '../ai-service/prompt/jch-prompt-short-anwser';
import {JCG_TOPIC} from '../type/jcg-topic-enum';

@Injectable()
export class DesignPatternsService {

  private readonly defaultLanguage = 'Korean'
  private readonly defaultLevel = 'medium'

  constructor(private readonly aiApiService: AiApiService) {}

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

  generatePrompt(
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
        return DbArchitechingPrompt.getPromptMessage(numberOfQuestions, difficulty, language);
      }
      case JCG_TOPIC.DESIGN_PATTERN: {
        return DesignPatternPrompt.getPromptMessage(numberOfQuestions, difficulty, language);
      }
      case JCG_TOPIC.SOFTWARE_DIAGRAM: {
        return SoftwareDiagramPrompt.getPromptMessage(numberOfQuestions, difficulty, language);
      }
      case JCG_TOPIC.INTEGRATION_TEST: {
        return IntegrationTestPrompt.getPromptMessage(numberOfQuestions, difficulty, language);
      }
      case JCG_TOPIC.MODULE_COUPLING_COHESION: {
        return ModuleCouplingCohesionPrompt.getPromptMessage(numberOfQuestions, difficulty, language);
      }
      case JCG_TOPIC.SOFTWARE_DEVELOPMENT_MODEL: {
        return SoftwareDevelopmentModelPrompt.getPromptMessage(numberOfQuestions, difficulty, language);
      }
      case JCG_TOPIC.TESTING_TYPES: {
        return TestingPrompt.getPromptMessage(numberOfQuestions, difficulty, language);
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

    const prompt = this.generatePrompt(numberOfQuestions, difficulty, language, topic);

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
}
