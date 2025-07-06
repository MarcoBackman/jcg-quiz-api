import { Injectable } from '@nestjs/common';
import { QuizQuestionResponse } from './dp.response';
import { AiApiService } from '../ai-service/ai-api.service'
import { DesignPatternPrompt } from '../ai-service/prompt/design-pattern';

@Injectable()
export class DesignPatternsService {

  private readonly defaultLanguage = 'Korean'
  private readonly defaultLevel = 'medium'

  constructor(private readonly aiApiService: AiApiService) {}

  async generateQuiz(
    numberOfQuestions : number,
     difficulty : string | undefined,
      language : string | undefined): Promise<QuizQuestionResponse[]> {
    
    
    //form prompt for api api
        

    const generationConfig = {
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

    if (difficulty === undefined) {
      difficulty = this.defaultLevel;
    }

    if (language === undefined) {
      language = this.defaultLanguage
    }

    const prompt = DesignPatternPrompt.getPromptMessage(numberOfQuestions, difficulty, language);

    // Use the injected AiApiService to call the Gemini API
    const aiResponse = await this.aiApiService.callGeminiApi(prompt, generationConfig);

    const quizId = `quiz_session_${Date.now()}`;

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
