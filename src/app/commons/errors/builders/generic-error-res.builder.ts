import { ErrorResDto } from '../dtos/error-res.dto';
import { ErrorDto } from '../dtos/error.dto';

export class GenericErrorResBuilder extends ErrorResDto<any> {
  buildResponse(): ErrorDto {
    return {
      message: 'Internal Server Error',
      status: 500,
    };
  }
}
