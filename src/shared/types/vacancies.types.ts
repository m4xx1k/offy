export interface IVacancy {
  id: string;
  title: string;
  normalizedTitle: string;
  description: string;
  descriptionMd: string;
  salaryFrom: number | null;
  salaryTo: number | null;
  currency: string;
  englishLevel: string | null;
  experienceYears: number | null;
  workFormat: WorkFormatType | null;
  locationId: string | null;
  companyId: string | null;
  source: string;
  sourceId: string;
  sourceUrl: string;
  postedAt: string;
  company: {
    id: string;
    name: string;
    website: string | null;
    logoUrl: string | null;
  };
  location: {
    id: string;
    city: string | null;
    country: string | null;
  } | null;
  skills: {
    skill: {
      id: string;
      name: string;
    };
  }[];
}
export const WorkFormat = {
  REMOTE: "REMOTE",
  OFFICE: "OFFICE",
  HYBRID: "HYBRID",
} as const;

export type WorkFormatType = keyof typeof WorkFormat;
