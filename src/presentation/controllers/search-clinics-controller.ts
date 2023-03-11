import { Http } from '../protocols/http';
import { Validation } from '../protocols/validation';
import { HttpError } from '../errors/http-errors';
import { ok } from '../helpers/http-helper';
import { SearchClinics } from '../../domain/usecases/search-clinics';

export class SearchClinicsController implements Http.Controller {
  constructor(
    private readonly validation: Validation<SearchClinicsController.Request>,
    private readonly searchClinics: SearchClinics,
  ) {}

  async handle(request: SearchClinicsController.Request):
  Promise<Http.Response<SearchClinicsController.Response>> {
    try {
      const badParams = await this.validation.validate(request);
      if (badParams) return new HttpError.BadRequest(badParams);

      const result = await this.searchClinics.search(request);

      return ok(result);
    } catch (error) {
      return new HttpError.Server();
    }
  }
}

export namespace SearchClinicsController {
  export type Request = SearchClinics.Params;
  export type Response = SearchClinics.Result;
}
