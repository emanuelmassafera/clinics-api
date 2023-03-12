import { SearchClinicsController } from '../../../presentation/controllers/search-clinics-controller';
import { Http } from '../../../presentation/protocols/http';
import makeSearchClinicsUseCase from '../usecases/search-clinics-usecase-factory';
import makeSearchClinicsControllerValidation from '../validations/search-clinics-controller-validation-factory';

const makeSearchClinicsController = (): Http.Controller => {
  const searchClinicsUseCase = makeSearchClinicsUseCase();
  const searchClinicsControllerValidation = makeSearchClinicsControllerValidation();
  const controller = new SearchClinicsController(
    searchClinicsControllerValidation,
    searchClinicsUseCase,
  );
  return controller;
};

export default makeSearchClinicsController;
