import { WorkFormatType } from "@/shared/types/vacancies.types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface FiltersState {
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
  setWorkFormat: (format: WorkFormatType | null) => void;
  setLocation: (value: string) => void;
  setSalaryMin: (value: number | null) => void;
  setSalaryMax: (value: number | null) => void;
  resetFilters: () => void;
}

const initialState: FiltersState = {
  search: "",
  skills: [],
  workFormat: null,
  location: "",
  salaryMin: null,
  salaryMax: null,
};

export const useVacancyFiltersStrore = create<FiltersState & FiltersActions>()(
  immer((set) => ({
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

    resetFilters: () =>
      set((state) => {
        // Скидаємо все до початкового стану
        state.search = initialState.search;
        state.skills = initialState.skills;
        state.workFormat = initialState.workFormat;
        state.location = initialState.location;
        state.salaryMin = initialState.salaryMin;
        state.salaryMax = initialState.salaryMax;
      }),
  }))
);
