import { Clinic } from '../../domain/models/clinic';
import { SearchClinics } from '../../domain/usecases/search-clinics';
import { SearchClinicsRepository } from '../protocols/database/search-clinics-repository';

export default class SearchClinicsUseCase implements SearchClinics {
  constructor(
    private readonly searchDentalClinicsRepository: SearchClinicsRepository,
    private readonly searchVetClinicsRepository: SearchClinicsRepository,
  ) {}

  async search(params: SearchClinics.Params): Promise<SearchClinics.Result> {
    const { category, ...searchClinicsParams } = params;

    if (params.category === Clinic.Category.Dental) {
      const result = await this.searchDentalClinicsRepository.searchClinics(searchClinicsParams);
      return result;
    }

    const result = await this.searchVetClinicsRepository.searchClinics(searchClinicsParams);
    return result;
  }
}
