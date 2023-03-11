import IdentifiedError from '../../domain/errors/identified-error';
import { Http } from '../protocols/http';
import { Validation } from '../protocols/validation';

export namespace HttpError {
  abstract class HttpErrorBase extends IdentifiedError implements Http.Response {
    body: any;

    passing?: IdentifiedError;

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

    pass(e: IdentifiedError): HttpErrorBase {
      this.passing = e;
      this.body = {
        ...this.body,
        type: e.name,
        message: e.message,
      };
      return this;
    }
  }

  export class BadRequest<T> extends HttpErrorBase {
    constructor(public readonly badParams: Validation.BadParams<T>) {
      super(400, 'BadRequest', 'Invalid request params');
      this.body.badParams = badParams;
    }
  }

  export class Unauthorized extends HttpErrorBase {
    constructor(message = 'Unauthorized access') {
      super(401, 'Unauthorized', message);
    }
  }

  export class Forbidden extends HttpErrorBase {
    constructor(message = 'You are not allowed to do it') {
      super(403, 'Forbidden', message);
    }
  }

  export class Server extends HttpErrorBase {
    constructor(message = 'Internal server error') {
      super(500, 'ServerError', message);
    }
  }
}
