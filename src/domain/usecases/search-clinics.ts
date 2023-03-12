import { List } from '../models/list';
import { Clinic } from '../models/clinic';

export interface SearchClinics {
  search: (params: SearchClinics.Params) => Promise<SearchClinics.Result>
}

export namespace SearchClinics {
  export type Params = {
    category: Clinic.Category
    name: string | null
    state: string | null
    availability: {
      from: string
      to: string
    } | null
    page: number | null
    limit: number | null
  };

  export type Result = List<Clinic.Model>;
}
