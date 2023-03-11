import { List } from '../models/list';
import { Clinic } from '../models/clinic';

export interface SearchClinics {
  search: (params: SearchClinics.Params) => Promise<SearchClinics.Result>
}

export namespace SearchClinics {
  export type Params = {
    category: Clinic.Category
    name?: string
    state?: string
    availability?: {
      from: string
      to: string
    }
    page?: number
    limit?: number
  };

  export type Result = List<Clinic.Model>;
}
