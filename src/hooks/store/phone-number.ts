import { create } from "zustand";

interface IEnterPhoneNumberProps {
  enteredPhoneNumber: string;
  setEnteredPhoneNumber: (value: string) => void;
}

export const useEnteredPhoneNumberStore = create<IEnterPhoneNumberProps>(
  (set) => ({
    enteredPhoneNumber: "",
    setEnteredPhoneNumber: (enteredPhoneNumber) => set({ enteredPhoneNumber }),
  })
);
