import { z } from 'zod';
import { Clinic } from '../../domain/models/clinic';
import { SearchClinics } from '../../domain/usecases/search-clinics';
import { SearchClinicsController } from '../controllers/search-clinics-controller';
import { Validation } from '../protocols/validation';

export default class SearchClinicsControllerValidation implements
Validation<SearchClinicsController.Request, SearchClinics.Params> {
  validate(input: SearchClinicsController.Request):
  Validation.Result<SearchClinicsController.Request, SearchClinics.Params> {
    const searchClinicsSchema = z.object({
      category: z.enum([Clinic.Category.Dental, Clinic.Category.Vet]),
      name: z.string().optional(),
      state: z.string().optional(),
      availability: z.object({
        from: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d|(?:24:00)$/),
        to: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d|(?:24:00)$/),
      }).or(
        z.object({
          from: z.undefined(),
          to: z.undefined(),
        }),
      ),
      page: z.coerce.number().min(1).optional(),
      limit: z.coerce.number().min(1).max(100).optional(),
    });

    const searchClinicsSchemaParsed = searchClinicsSchema.safeParse({
      category: input.category,
      name: input.name,
      state: input.state,
      availability: {
        from: input.availabilityFrom,
        to: input.availabilityTo,
      },
      page: input.page,
      limit: input.limit,
    });

    if (!searchClinicsSchemaParsed.success) {
      return {
        formattedRequest: searchClinicsSchemaParsed.error.format(),
        hasIssues: true,
      };
    }

    return {
      formattedRequest: searchClinicsSchemaParsed.data,
      hasIssues: false,
    };
  }
}
