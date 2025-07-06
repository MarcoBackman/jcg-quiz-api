import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Max, IsArray, ArrayMinSize, IsIn } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Optional, for Swagger documentation

/**
 * DTO for requesting quiz questions.
 */
export class GenerateQuizDto {
  @ApiProperty({ description: 'The number of quiz questions to generate (between 1 and 10).', example: 5, minimum: 1, maximum: 10 })
  @IsNumber()
  @Min(1)
  @Max(10)
  numberOfQuestions: number;

  @ApiProperty({ description: 'Optional: The difficulty level of the quiz questions.', enum: ['easy', 'medium', 'hard'], example: 'medium', required: false })
  @IsOptional()
  @IsString()
  @IsIn(['easy', 'medium', 'hard'])
  difficulty?: 'easy' | 'medium' | 'hard';

  @ApiProperty({ description: 'A language type from user', example: ['Korean'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString()
  @ArrayMinSize(1)
  language?: string;

  @ApiProperty({ description: 'Optional: Specific design pattern categories or topics to focus on.', example: ['Design Pattern'], type: [String], required: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  topic: string;
}