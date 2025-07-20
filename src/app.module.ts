import { Module } from '@nestjs/common';
import { MainController } from './main-controller';
import { QuizController } from './quiz/dp.controller';
import { JcgQuizService } from './quiz/dp.service';
import { AiServiceModule } from './ai-service/ai-service.module'; // Import the new AiServiceModule
import { ConfigModule } from './config/config.module'; 

@Module({
  imports: [
    ConfigModule,
    AiServiceModule,
  ],
  controllers: [QuizController, MainController],
  providers: [JcgQuizService],
})
export class AppModule {}

