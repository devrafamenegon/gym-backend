import { ErrorResDto } from '../dtos/error-res.dto';
import { ErrorDto } from '../dtos/error.dto';

export class AxiosErrorResBuilder extends ErrorResDto<any> {
  buildResponse(): ErrorDto {
    const { response } = this.error;
    return {
      message: response ? response.statusText : this.error.message,
      status: response ? response.status : 500,
    };
  }
}
