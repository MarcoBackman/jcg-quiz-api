import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule for HttpService
import { AiApiService } from './ai-api.service'; // Import your AiApiService
import { ConfigModule } from '../config/config.module'; // Import ConfigModule

@Module({
  imports: [
    HttpModule,
    ConfigModule, 
  ],
  providers: [AiApiService],
  exports: [AiApiService], 
})
export class AiServiceModule {}