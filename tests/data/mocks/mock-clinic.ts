import { SearchClinicsRepository } from '../../../src/data/protocols/database/search-clinics-repository';
import { mockClinicModels } from '../../domain/mocks/mock-clinic';

export default class SearchClinicsRepositorySpy implements SearchClinicsRepository {
  params: SearchClinicsRepository.Params | undefined;

  result: SearchClinicsRepository.Result = {
    elements: mockClinicModels(),
    totalElements: 2,
    totalPages: 1,
    currentPage: 1,
  };

  async searchClinics(params: SearchClinicsRepository.Params):
  Promise<SearchClinicsRepository.Result> {
    this.params = params;
    return this.result;
  }
}
