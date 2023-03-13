import IdentifiedError from '../../domain/errors/identified-error';
import { Http } from '../protocols/http';
import { Validation } from '../protocols/validation';

export namespace HttpError {
  abstract class HttpErrorBase extends IdentifiedError implements Http.Response {
    body: any;

    constructor(
      public readonly statusCode: number,
      public readonly name: string,
      public readonly message: string,
    ) {
      super('HttpError', name, message);

      this.body = {
        name,
        message,
      };
    }
  }

  export class BadRequest<T> extends HttpErrorBase {
    constructor(public readonly badParams: Validation.BadParams<T>) {
      super(400, 'BadRequest', 'Invalid request params');
      this.body.badParams = badParams;
    }
  }

  export class Server extends HttpErrorBase {
    constructor(message = 'Internal server error') {
      super(500, 'ServerError', message);
    }
  }
}
