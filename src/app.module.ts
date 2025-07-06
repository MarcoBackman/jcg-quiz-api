import { Module } from '@nestjs/common';
import { MainController } from './main-controller';
import { DesignPatternsController } from './quiz/dp.controller';
import { DesignPatternsService } from './quiz/dp.service';
import { AiServiceModule } from './ai-service/ai-service.module'; // Import the new AiServiceModule
import { ConfigModule } from './config/config.module'; 

@Module({
  imports: [
    ConfigModule,
    AiServiceModule,
  ],
  controllers: [DesignPatternsController, MainController],
  providers: [DesignPatternsService],
})
export class AppModule {}

