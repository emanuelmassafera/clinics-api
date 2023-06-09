import { SearchClinics } from '../../../domain/usecases/search-clinics';

export interface SearchClinicsRepository {
  searchClinics: (params: SearchClinicsRepository.Params) => Promise<SearchClinicsRepository.Result>
}

export namespace SearchClinicsRepository {
  export type Params = Omit<SearchClinics.Params, 'category'>;
  export type Result = SearchClinics.Result;
}
