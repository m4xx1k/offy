// Типи для сутності Vacancy

import type { Company } from "@/entities/company";
import type { Skill } from "@/entities/skill";
import type { Location } from "@/entities/location";

export interface IVacancy {
  id: string;
  title: string;
  normalizedTitle?: string;
  description: string;
  descriptionMd?: string;
  salaryFrom?: number;
  salaryTo?: number;
  currency?: string;
  experienceYears?: number;
  englishLevel?: string;
  workFormat?: string;
  source: string;
  sourceUrl: string;
  postedAt: string;
  company?: Company;
  skills?: Array<{ skill: Skill }>;
  locations?: IVacancyLocation[];
}
export interface IVacancyLocation {
  vacancyId: string;
  locationId: string;
  location: Location;
}

export type VacancyListItem = Pick<
  IVacancy,
  | "id"
  | "title"
  | "salaryFrom"
  | "salaryTo"
  | "currency"
  | "experienceYears"
  | "englishLevel"
  | "workFormat"
  | "source"
  | "postedAt"
  | "company"
  | "skills"
  | "locations"
>;

// Типи для запитів
export interface VacanciesQuery {
  take?: number;
  skip?: number;
  search?: string;
  salaryFrom?: number;
  salaryTo?: number;
  workFormat?: WorkFormatType[];
  skills?: string[];
  locationId?: string;
}

export interface IPaginatedResult<T> {
  items: T[];
  total: number;
  hasMore: boolean;
}

export interface FiltersData {
  skills: Skill[];
  locations: Location[];
}

export type WorkFormatType = "REMOTE" | "OFFICE" | "HYBRID";
