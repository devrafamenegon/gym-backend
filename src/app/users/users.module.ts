import { Module } from '@nestjs/common';
import { UsersController } from '../users/controllers/users.controller';
import { UsersService } from '../users/services/users.service';

@Module({
  imports: [],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
