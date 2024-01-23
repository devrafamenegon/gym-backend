import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserResDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  role: number;
}
