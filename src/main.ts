import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';

class App {
  app: INestApplication;
  swaggerConfig: Omit<OpenAPIObject, 'paths'>;

  private defaultConfig: ConfigService;

  constructor() {
    this.startSetup();
  }

  async startSetup() {
    try {
      await this.bootstrap();
      await this.swaggerSetup();
      await this.serverSetup();
    } catch (err) {
      console.log(err.message);
    }
  }

  async bootstrap() {
    this.app = await NestFactory.create(AppModule);
    this.defaultConfig = this.app.get(ConfigService);
    this.app.enableCors(this.defaultConfig.get('cors'));
    this.app.useGlobalPipes(new ValidationPipe());
    this.app.use(cookieParser());
    this.app.setGlobalPrefix(this.defaultConfig.get('app.prefix'));
  }

  async swaggerSetup() {
    this.swaggerConfig = new DocumentBuilder()
      .setTitle(this.defaultConfig.get('app.name'))
      .setDescription(this.defaultConfig.get('app.description'))
      .setVersion(this.defaultConfig.get('app.version'))
      .addServer(this.defaultConfig.get('app.prefix'))
      .build();
    const document = SwaggerModule.createDocument(
      this.app,
      this.swaggerConfig,
      {
        ignoreGlobalPrefix: true,
      },
    );
    fs.writeFileSync('./swagger.json', JSON.stringify(document));
    SwaggerModule.setup('api', this.app, document);
  }

  async serverSetup() {
    await this.app.listen(this.defaultConfig.get('port'), async () => {
      console.log(`Application is running on: ${await this.app.getUrl()}`);
    });
  }
}

export default new App();
