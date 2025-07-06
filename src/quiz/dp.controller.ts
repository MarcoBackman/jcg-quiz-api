import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  GenerateQuizDto
} from './dp.dto';
import {
  QuizQuestionResponse
} from './dp.response';
import {
  DesignPatternsService
} from './dp.service';


@ApiTags('AI - based Quiz Controller')
@Controller()
export class DesignPatternsController {
  constructor(private readonly designPatternsService: DesignPatternsService) {}
 
  @Post('quiz/generate-design-pattern') 
  @ApiOperation({ summary: 'Generate a set of design pattern quiz questions' })
  @ApiResponse({
    status: 200,
    description: 'Quiz questions generated successfully.',
    type: QuizQuestionResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid request parameters.' })
  async generateDesignPatternQuiz(
    @Body() generateQuizDto: GenerateQuizDto, 
  ): Promise<QuizQuestionResponse[]> { 

    const quizResponse = await this.designPatternsService.generateQuiz(
      generateQuizDto.numberOfQuestions,
      generateQuizDto.difficulty,
      generateQuizDto.language
    );
    return quizResponse;
  }
}
