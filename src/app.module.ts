import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { AuthModule } from './app/modules/auth/auth.module';
import { AuthController } from './app/modules/auth/controllers/auth.controller';
import { UsersController } from './app/modules/users/controllers/users.controller';
import { UsersModule } from './app/modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes(UsersController, AuthController);
  }
}
