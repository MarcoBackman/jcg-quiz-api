import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ServerConfig {
  constructor(private nestConfigService: NestConfigService) {}

  get port(): number {
    return this.nestConfigService.get<number>('PORT', 3000);
  }

  get corsOrigin(): string | string[] {
    const origin = this.nestConfigService.get<string>('CORS_ORIGIN', '*');
    // If multiple origins are comma-separated, split them into an array
    if (origin.includes(',')) {
      return origin.split(',').map(s => s.trim());
    }
    return origin;
  }

  get apiPrefix(): string {
    return this.nestConfigService.get<string>('API_PREFIX', 'api');
  }

  get aiApiBaseUrl() : string {
    return this.nestConfigService.get<string>('AI_API_BASE_URL', 'https://generativelanguage.googleapis.com/v1beta/models/');
  }

  get aiApiKey() : string {
    return this.nestConfigService.get<string>('AI_API_KEY', '');
  }

  get aiAgent() : string {
    return this.nestConfigService.get<string>('AI_AGENT', 'api');
  }
}