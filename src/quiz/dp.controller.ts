import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {GenerateQuizDto} from './dp.dto';
import {QuizQuestionResponse} from './dp.response';
import {DesignPatternsService} from './dp.service';
import {JCG_TOPIC} from '../type/jcg-topic-enum';


@ApiTags('AI - based Quiz Controller')
@Controller()
export class DesignPatternsController {
  constructor(private readonly designPatternsService: DesignPatternsService) {}


  @Post('quiz/generate-db-architecture') 
  @ApiOperation({ summary: 'Generate a set of db architecture quiz questions' })
  @ApiResponse({
    status: 200,
    description: 'Quiz questions generated successfully.',
    type: QuizQuestionResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid request parameters.' })
  async generateDbArchitectureQuiz(
    @Body() generateQuizDto: GenerateQuizDto, 
  ): Promise<QuizQuestionResponse[]> { 

    const quizResponse = await this.designPatternsService.generateShortAnswerQuiz(
      generateQuizDto.numberOfQuestions,
      generateQuizDto.difficulty,
      generateQuizDto.language,
      JCG_TOPIC.DB_ARCHITECTURE
    );
    return quizResponse;
  }

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

    const quizResponse = await this.designPatternsService.generateShortAnswerQuiz(
      generateQuizDto.numberOfQuestions,
      generateQuizDto.difficulty,
      generateQuizDto.language,
      JCG_TOPIC.DESIGN_PATTERN
    );
    return quizResponse;
  }

  @Post('quiz/generate-software-diagram') 
  @ApiOperation({ summary: 'Generate a set of software diagram quiz questions' })
  @ApiResponse({
    status: 200,
    description: 'Quiz questions generated successfully.',
    type: QuizQuestionResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid request parameters.' })
  async generateSoftwareDiagramQuiz(
    @Body() generateQuizDto: GenerateQuizDto, 
  ): Promise<QuizQuestionResponse[]> { 

    const quizResponse = await this.designPatternsService.generateShortAnswerQuiz(
      generateQuizDto.numberOfQuestions,
      generateQuizDto.difficulty,
      generateQuizDto.language,
      JCG_TOPIC.SOFTWARE_DIAGRAM
    );
    return quizResponse;
  }

  @Post('quiz/generate-integration-test') 
  @ApiOperation({ summary: 'Generate a set of integration test questions' })
  @ApiResponse({
    status: 200,
    description: 'Quiz questions generated successfully.',
    type: QuizQuestionResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid request parameters.' })
  async generateIntegrationTestQuiz(
    @Body() generateQuizDto: GenerateQuizDto, 
  ): Promise<QuizQuestionResponse[]> { 

    const quizResponse = await this.designPatternsService.generateShortAnswerQuiz(
      generateQuizDto.numberOfQuestions,
      generateQuizDto.difficulty,
      generateQuizDto.language,
      JCG_TOPIC.INTEGRATION_TEST
    );
    return quizResponse;
  }

  @Post('quiz/generate-module-coupling-cohesion') 
  @ApiOperation({ summary: 'Generate a set of module coupling and cohesion quiz questions' })
  @ApiResponse({
    status: 200,
    description: 'Quiz questions generated successfully.',
    type: QuizQuestionResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid request parameters.' })
  async generateModuleCouplingCohesionQuiz(
    @Body() generateQuizDto: GenerateQuizDto, 
  ): Promise<QuizQuestionResponse[]> { 

    const quizResponse = await this.designPatternsService.generateShortAnswerQuiz(
      generateQuizDto.numberOfQuestions,
      generateQuizDto.difficulty,
      generateQuizDto.language,
      JCG_TOPIC.MODULE_COUPLING_COHESION
    );
    return quizResponse;
  }

  @Post('quiz/generate-software-development-model') 
  @ApiOperation({ summary: 'Generate a set of software development quiz questions' })
  @ApiResponse({
    status: 200,
    description: 'Quiz questions generated successfully.',
    type: QuizQuestionResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid request parameters.' })
  async generateSoftwareDevelopmentModelQuiz(
    @Body() generateQuizDto: GenerateQuizDto, 
  ): Promise<QuizQuestionResponse[]> { 

    const quizResponse = await this.designPatternsService.generateShortAnswerQuiz(
      generateQuizDto.numberOfQuestions,
      generateQuizDto.difficulty,
      generateQuizDto.language,
      JCG_TOPIC.SOFTWARE_DEVELOPMENT_MODEL
    );
    return quizResponse;
  }

  @Post('quiz/generate-testing') 
  @ApiOperation({ summary: 'Generate a set of testing quiz questions' })
  @ApiResponse({
    status: 200,
    description: 'Quiz questions generated successfully.',
    type: QuizQuestionResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid request parameters.' })
  async generateTestingQuiz(
    @Body() generateQuizDto: GenerateQuizDto, 
  ): Promise<QuizQuestionResponse[]> { 

    const quizResponse = await this.designPatternsService.generateShortAnswerQuiz(
      generateQuizDto.numberOfQuestions,
      generateQuizDto.difficulty,
      generateQuizDto.language,
      JCG_TOPIC.TESTING_TYPES
    );
    return quizResponse;
  }
}
