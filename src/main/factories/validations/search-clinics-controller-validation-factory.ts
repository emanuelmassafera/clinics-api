import { SearchClinics } from '../../../domain/usecases/search-clinics';
import { SearchClinicsController } from '../../../presentation/controllers/search-clinics-controller';
import { Validation } from '../../../presentation/protocols/validation';
import SearchClinicsControllerValidation from '../../../presentation/validations/search-clinics-controller-validation';

const makeSearchClinicsControllerValidation = ():
Validation<SearchClinicsController.Request, SearchClinics.Params> => {
  const validation = new SearchClinicsControllerValidation();
  return validation;
};

export default makeSearchClinicsControllerValidation;
