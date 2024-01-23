import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwt.secret'),
          signOptions: { expiresIn: configService.get('jwt.expires') },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [JwtModule],
})
export class AuthModule {}
