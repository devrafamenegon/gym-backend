import { IsNotEmpty, IsObject } from 'class-validator';
import { UserReqDto } from './user.req.dto';

export class AuthenticatedReqDto {
  @IsObject()
  @IsNotEmpty()
  user: UserReqDto;
}
