import { ErrorDto } from './error.dto';

export abstract class ErrorResDto<T> {
  constructor(protected readonly error: T | any) {}
  abstract buildResponse(): ErrorDto;
}
