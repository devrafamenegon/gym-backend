import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersControllerInterface } from './users.controller.interface';
import { AuthGuard } from '../../auth/guards/auth.guard';

@Controller('users')
export class UsersController implements UsersControllerInterface {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
