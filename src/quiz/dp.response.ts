import { IsString, IsNotEmpty, IsBoolean, IsArray, ArrayMinSize } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuizQuestionResponse {
  @ApiProperty({ description: 'A unique identifier for this quiz question.', example: 'dp_q_001' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The main text of the quiz question.', example: 'Which design pattern ensures a class has only one instance and provides a global point of access to it?' })
  @IsString()
  @IsNotEmpty()
  questionText: string;

  @ApiProperty({ description: 'A more detailed description or introductory text for the question, if needed. Can be the same as questionText.', example: 'Consider a scenario where you need to manage a single instance of a resource, such as a logging utility or a configuration manager.' })
  @IsString()
  @IsNotEmpty()
  description: string; // This covers your "description for an answer" or general question context

  @ApiProperty({ description: 'The correct answer among the options. The frontend will use this to check the user\'s selection.', example: 'Singleton' })
  @IsString()
  @IsNotEmpty()
  correctAnswer: string;

  @ApiProperty({ description: 'A detailed explanation for the correct answer, provided for learning purposes.', example: 'The Singleton pattern is specifically designed to restrict the instantiation of a class to one object, ensuring a single global point of access. This is useful for managing shared resources efficiently.' })
  @IsString()
  @IsNotEmpty()
  explanation: string;
}
