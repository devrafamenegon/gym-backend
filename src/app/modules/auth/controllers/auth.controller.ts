import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
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
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
