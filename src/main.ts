import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('PORT:', process.env.PORT);
  console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);
  console.log('API_PREFIX:', process.env.API_PREFIX);

  const corsOrigin = process.env.CORS_ORIGIN;
  const apiPrefix = process.env.API_PREFIX;
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  if (corsOrigin) {
    const allowedOrigins = corsOrigin.split(',').map(s => s.trim());
    app.enableCors({
      origin: allowedOrigins,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
  } else {
    console.warn('CORS_ORIGIN not defined in .env. CORS might be overly permissive or restricted.');
    // app.enableCors(); // Enable for all origins (not recommended for production)
  }

  if (apiPrefix) {
    app.setGlobalPrefix(apiPrefix);
  }

  const config = new DocumentBuilder()
    .setTitle('Quiz example')
    .setDescription('AI를 활용한 정보처리기사 퀴즈 프로젝트')
    .setVersion('1.0')
    .addTag('정처기')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
