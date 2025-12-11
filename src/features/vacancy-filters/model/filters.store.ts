import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { WorkFormatType } from "@/shared/config/constants";

export interface VacancyFilters {
  search: string;
  skills: string[];
  workFormat: WorkFormatType | null;
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
}

interface FiltersActions {
  setSearch: (value: string) => void;
  toggleSkill: (skill: string) => void;
  setSkills: (skills: string[]) => void;
  setWorkFormat: (format: WorkFormatType | null) => void;
  setLocation: (value: string) => void;
  setSalaryMin: (value: number | null) => void;
  setSalaryMax: (value: number | null) => void;
  setSalaryRange: (min: number | null, max: number | null) => void;
  resetFilters: () => void;
  hasActiveFilters: () => boolean;
}

const initialState: VacancyFilters = {
  search: "",
  skills: [],
  workFormat: null,
  location: "",
  salaryMin: null,
  salaryMax: null,
};

export const useVacancyFiltersStore = create<VacancyFilters & FiltersActions>()(
  immer((set, get) => ({
    ...initialState,

    setSearch: (value) =>
      set((state) => {
        state.search = value;
      }),

    toggleSkill: (skill) =>
      set((state) => {
        const index = state.skills.indexOf(skill);
        if (index !== -1) {
          state.skills.splice(index, 1);
        } else {
          state.skills.push(skill);
        }
      }),

    setSkills: (skills) =>
      set((state) => {
        state.skills = skills;
      }),

    setWorkFormat: (format) =>
      set((state) => {
        state.workFormat = format;
      }),

    setLocation: (value) =>
      set((state) => {
        state.location = value;
      }),

    setSalaryMin: (value) =>
      set((state) => {
        state.salaryMin = value;
      }),

    setSalaryMax: (value) =>
      set((state) => {
        state.salaryMax = value;
      }),

    setSalaryRange: (min, max) =>
      set((state) => {
        state.salaryMin = min;
        state.salaryMax = max;
      }),

    resetFilters: () =>
      set((state) => {
        state.search = initialState.search;
        state.skills = [...initialState.skills];
        state.workFormat = initialState.workFormat;
        state.location = initialState.location;
        state.salaryMin = initialState.salaryMin;
        state.salaryMax = initialState.salaryMax;
      }),

    hasActiveFilters: () => {
      const state = get();
      return !!(
        state.search ||
        state.skills.length > 0 ||
        state.workFormat ||
        state.location ||
        state.salaryMin ||
        state.salaryMax
      );
    },
  }))
);

