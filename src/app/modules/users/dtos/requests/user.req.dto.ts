import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserReqDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  role: number;
}