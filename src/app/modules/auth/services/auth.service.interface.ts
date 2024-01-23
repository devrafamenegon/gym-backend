import { LoginDto } from '../dtos/requests/login.req.dto';
import { RegisterDto } from '../dtos/requests/register.req.dto';

export interface AuthServiceInterface {
  login(data: LoginDto): Promise<any>;
  register(data: RegisterDto): Promise<any>;
}
