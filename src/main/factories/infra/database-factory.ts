import DentalClinicsRepository from '../../../infra/database/repositories/dental-clinics-repository';
import VetClinicsRepository from '../../../infra/database/repositories/vet-clinics-repository';

export const makeDentalClinicsRepository = ():
DentalClinicsRepository => new DentalClinicsRepository();

export const makeVetClinicsRepository = ():
VetClinicsRepository => new VetClinicsRepository();
