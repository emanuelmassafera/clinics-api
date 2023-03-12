import { SearchClinics } from '../../domain/usecases/search-clinics';
import { Http } from '../protocols/http';
import { Validation } from '../protocols/validation';
import { HttpError } from '../errors/http-errors';
import { ok } from '../helpers/http-helper';

export class SearchClinicsController implements Http.Controller {
  constructor(
    private readonly validation: Validation<SearchClinicsController.Request, SearchClinics.Params>,
    private readonly searchClinics: SearchClinics,
  ) {}

  async handle(request: SearchClinicsController.Request):
  Promise<Http.Response<SearchClinicsController.Response>> {
    try {
      const { formattedRequest, badParams } = await this.validation.validate(request);
      if (badParams) return new HttpError.BadRequest(badParams);

      const result = await this.searchClinics.search(formattedRequest);

      return ok(result);
    } catch (error) {
      return new HttpError.Server();
    }
  }
}

export namespace SearchClinicsController {
  export type Request = {
    category: string
    name: string
    state: string
    availabilityFrom: string
    availabilityTo: string
    page: string
    limit: string
  };
  export type Response = SearchClinics.Result;
}
