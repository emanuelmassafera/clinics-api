import { SearchClinics } from '../../../../src/domain/usecases/search-clinics';
import { mockClinicModels } from '../../../domain/mocks/mock-clinic';

export default class SearchClinicsSpy implements SearchClinics {
  params: SearchClinics.Params | undefined;

  result: SearchClinics.Result = {
    elements: mockClinicModels(),
    totalElements: 2,
    totalPages: 1,
    currentPage: 1,
  };

  async search(params: SearchClinics.Params): Promise<SearchClinics.Result> {
    this.params = params;
    return this.result;
  }
}
