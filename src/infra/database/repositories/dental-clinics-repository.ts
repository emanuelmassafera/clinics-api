import { SearchClinicsRepository } from '../../../data/protocols/database/search-clinics-repository';
import { DatabaseHelper, DentalClinic } from '../helpers/database-helper';
import { checkSubString, convertAvailabilityIntoDate } from '../utils/utils';

export default class DentalClinicsRepository implements SearchClinicsRepository {
  async searchClinics(params: SearchClinicsRepository.Params):
  Promise<SearchClinicsRepository.Result> {
    const { page, limit, ...filterParams } = params;

    const dentalClinicsRepository = await DatabaseHelper.getRepository<DentalClinic>('dentalClinics');

    const filteredData = dentalClinicsRepository.filter(
      (element) => {
        let isTheNameMatchingTheFilter = true;
        let isTheStateMatchingTheFilter = true;
        let isTheAvailabilityMatchingTheFilter = true;

        if (filterParams.name) {
          isTheNameMatchingTheFilter = checkSubString(element.name, filterParams.name);
        }

        if (filterParams.state) {
          isTheStateMatchingTheFilter = checkSubString(element.stateName, filterParams.state);
        }

        if (
          filterParams.availability
          && filterParams.availability.from
          && filterParams.availability.to
        ) {
          const clinicAvailability = convertAvailabilityIntoDate(element.availability);
          const filterAvailability = convertAvailabilityIntoDate(filterParams.availability);

          isTheAvailabilityMatchingTheFilter = clinicAvailability.from <= filterAvailability.from
          && clinicAvailability.to >= filterAvailability.to;
        }

        return isTheNameMatchingTheFilter
        && isTheStateMatchingTheFilter
        && isTheAvailabilityMatchingTheFilter;
      },
    );

    const currentPage = page || 1;
    const pageSize = limit || 20;
    const skipSize = pageSize * (currentPage - 1);

    const pagedData = filteredData
      .slice(skipSize, currentPage * pageSize);

    const formattedData = pagedData.map((element) => ({
      name: element.name,
      state: element.stateName,
      availability: element.availability,
    }));

    return {
      elements: formattedData,
      totalElements: formattedData.length,
      totalPages: filteredData.length === 0
        ? 1
        : Math.ceil(filteredData.length / pageSize),
      currentPage,
    };
  }
}
