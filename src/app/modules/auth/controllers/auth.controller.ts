import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthControllerInterface } from './auth.controller.interface';
import { RegisterDto } from '../dtos/requests/register.req.dto';
import { LoginDto } from '../dtos/requests/login.req.dto';
import { ErrorResFactory } from '@/app/commons/errors/factories/error-res.factory';

@Controller('auth')
export class AuthController implements AuthControllerInterface {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() body: RegisterDto) {
    try {
      return await this.authService.register(body);
    } catch (error) {
      ErrorResFactory.throwExceptionFromError(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      return await this.authService.login(body);
    } catch (error) {
      ErrorResFactory.throwExceptionFromError(error);
    }
  }
}
