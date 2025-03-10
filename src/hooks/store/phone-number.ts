import { create } from "zustand";

type enteredPhoneNumberType = {
  flag: string;
  dial_code: string;
  number: string;
};

interface IEnterPhoneNumberProps {
  enteredPhoneNumber: enteredPhoneNumberType;
  setEnteredPhoneNumber: (value: enteredPhoneNumberType) => void;
}

export const useEnteredPhoneNumberStore = create<IEnterPhoneNumberProps>(
  (set) => ({
    enteredPhoneNumber: {
      flag: "",
      dial_code: "",
      number: "",
    },
    setEnteredPhoneNumber: (enteredPhoneNumber) => set({ enteredPhoneNumber }),
  })
);
