import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BusinessErrorFilter } from './core/filters/business-error.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useGlobalFilters(new BusinessErrorFilter());

  const config = new DocumentBuilder()
    .setTitle('API Documentación')
    .setDescription('Documentación de la API con Swagger')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
