import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './app/users/users.module';
import { UsersController } from './app/users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';
import config from './config/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes(UsersController);
  }
}
