import { LoginDto } from '../dtos/requests/login.req.dto';
import { RegisterDto } from '../dtos/requests/register.req.dto';

export interface AuthControllerInterface {
  register(body: RegisterDto): Promise<any>;
  login(body: LoginDto): Promise<any>;
}
