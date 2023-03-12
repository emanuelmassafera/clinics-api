import { readFile } from 'node:fs/promises';

type DatabaseRepositories = 'dentalClinics' | 'vetClinics';

export type DentalClinic = {
  name: string
  stateName: string
  availability: {
    from: string
    to: string
  }
};

export type VetClinic = {
  clinicName: string
  stateCode: string
  opening: {
    from: string
    to: string
  }
};

export const DatabaseHelper = {
  isConnected: false as boolean,
  dentalClinicsRepository: [] as DentalClinic[],
  vetClinicsRepository: [] as VetClinic[],
  dentalClinicsRepositoryPath: null as unknown as URL,
  vetClinicsRepositoryPath: null as unknown as URL,

  async connect(dentalClinicsRepositoryPath: URL, vetClinicsRepositoryPath: URL) {
    this.dentalClinicsRepositoryPath = dentalClinicsRepositoryPath;
    this.vetClinicsRepositoryPath = vetClinicsRepositoryPath;

    const dentalClinicsData = await readFile(dentalClinicsRepositoryPath, 'utf8');
    this.dentalClinicsRepository = JSON.parse(dentalClinicsData);

    const vetClinicsClinicsData = await readFile(vetClinicsRepositoryPath, 'utf8');
    this.vetClinicsRepository = JSON.parse(vetClinicsClinicsData);

    this.isConnected = true;
  },

  async getRepository<T>(target: DatabaseRepositories): Promise<Array<T>> {
    if (!this.isConnected) {
      await this.connect(this.dentalClinicsRepositoryPath, this.vetClinicsRepositoryPath);
    }

    if (target === 'dentalClinics') {
      return this.dentalClinicsRepository as T[];
    }

    return this.vetClinicsRepository as T[];
  },
};
