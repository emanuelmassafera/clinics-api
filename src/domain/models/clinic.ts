export namespace Clinic {
  export interface Model {
    name: string
    state: string
    availability: {
      from: string
      to: string
    }
  }

  export enum Category {
    Dental = 'DENTAL',
    Vet = 'VET',
  }
}
