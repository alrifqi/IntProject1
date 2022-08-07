import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.use(helmet());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Project Api')
    .setDescription('Project Api Doc')
    .addTag('projectapp')
    .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, swaggerDocument);
    app.enableCors();
  await app.listen(3000);
}
bootstrap();
