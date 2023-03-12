import { SearchClinics } from '../../../domain/usecases/search-clinics';
import SearchClinicsUseCase from '../../../data/usecases/search-clinics-usecase';
import { makeDentalClinicsRepository, makeVetClinicsRepository } from '../infra/database-factory';

const makeSearchClinicsUseCase = (): SearchClinics => {
  const dentalClinicsRepository = makeDentalClinicsRepository();
  const vetClinicsRepository = makeVetClinicsRepository();

  return new SearchClinicsUseCase(dentalClinicsRepository, vetClinicsRepository);
};

export default makeSearchClinicsUseCase;
