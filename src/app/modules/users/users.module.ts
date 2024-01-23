import { Module } from '@nestjs/common';
import { UsersController } from '../users/controllers/users.controller';
import { UsersService } from '../users/services/users.service';
import { PrismaService } from '@/infra/prisma/services/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  exports: [UsersService],
  providers: [UsersService, PrismaService, JwtService],
  controllers: [UsersController],
})
export class UsersModule {}
