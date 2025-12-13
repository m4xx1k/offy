import { create } from "zustand";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

interface IngestFilterState {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

export const useIngestFilter = create<IngestFilterState>((set) => ({
  date: {
    from: addDays(new Date(), -7), // Дефолт: останній тиждень
    to: new Date(),
  },
  setDate: (date) => set({ date }),
}));
