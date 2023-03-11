import { SearchClinics } from '../../domain/usecases/search-clinics';
import { SearchClinicsRepository } from '../protocols/database/search-clinics-repository';

export default class SearchClinicsUseCase implements SearchClinics {
  constructor(private readonly searchClinicsRepository: SearchClinicsRepository) {}

  async search(params: SearchClinics.Params): Promise<SearchClinics.Result> {
    const result = await this.searchClinicsRepository.searchClinics(params);
    return result;
  }
}
