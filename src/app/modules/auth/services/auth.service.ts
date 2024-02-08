import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dtos/requests/register.req.dto';
import { LoginDto } from '../dtos/requests/login.req.dto';
import { AuthServiceInterface } from './auth.service.interface';
import { UserReqDto } from '../../users/dtos/requests/user.req.dto';
import { PrismaService } from '@/infra/prisma/services/prisma.service';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async login(data: LoginDto) {
    const { username, password } = data;

    const user = await this.prismaService.user.findFirst({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(data: RegisterDto) {
    const { username } = data;

    const userExists = await this.usersService.findByUsername(username);

    if (userExists) {
      throw new HttpException(
        'User already registered',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userToRegister: UserReqDto = {
      ...data,
      role: 0,
    };

    await this.usersService.register(userToRegister);
  }
}
