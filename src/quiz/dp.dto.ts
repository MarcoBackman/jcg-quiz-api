import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber, Min, Max, IsArray, ArrayMinSize, IsIn } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Optional, for Swagger documentation
import { JCG_TOPIC } from 'src/type/jcg-topic-enum';

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
}

export class TopicTestDto {
  @ApiProperty({
    enum: JCG_TOPIC, // This helps Swagger understand the allowed values
    description: 'The topic to test keywords for (e.g., DB_ARCHITECTURE)',
    example: JCG_TOPIC.DB_ARCHITECTURE,
  })
  @IsEnum(JCG_TOPIC, {
    message: `topic must be a valid enum value from: ${Object.values(JCG_TOPIC).join(', ')}`,
  })
  @IsNotEmpty()
  topic: JCG_TOPIC; // Use the enum type directly here

  @ApiProperty({
    description: 'The language for the topic keywords (e.g., "en", "ko")',
    example: 'en',
  })
  @IsString()
  @IsNotEmpty()
  language: string;
}