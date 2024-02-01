import { PrismaService } from '@/infra/prisma/services/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserReqDto } from '../dtos/requests/user.req.dto';
import { UserResDto } from '../dtos/responses/user.res.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findByUsername(username: string): Promise<UserResDto | undefined> {
    return this.prismaService.user.findFirst({
      where: { username },
    });
  }

  async register(data: UserReqDto) {
    const userWithUsernameExists = await this.prismaService.user.findFirst({
      where: { username: data.username },
    });

    const userWithEmailExists = await this.prismaService.user.findFirst({
      where: { email: data.email },
    });

    if (userWithUsernameExists) {
      throw new HttpException(
        `User ${data.username} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    if (userWithEmailExists) {
      throw new HttpException(
        `User ${data.email} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    await this.prismaService.user.create({
      data,
    });
  }
}
