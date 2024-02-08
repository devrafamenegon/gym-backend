import { IsNotEmpty, IsString } from 'class-validator';

export class UserReqDto {
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
