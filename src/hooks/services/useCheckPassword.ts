import { useState } from "react";

type passwordReqMts = {
  is1UpperCase: boolean;
  is1LowerCase: boolean;
  is1SpecialCharacter: boolean;
  is1Number: boolean;
};

export const passwordRequirements: {
  label: string;
  key: keyof passwordReqMts;
}[] = [
  {
    label: "At least one Uppercase (e.g., A,B)",
    key: "is1UpperCase",
  },
  {
    label: "At least one lowercase (e.g., a,b)",
    key: "is1LowerCase",
  },
  {
    label: "At least one special character (e.g., @,!)",
    key: "is1SpecialCharacter",
  },
  {
    label: "At least one number (e.g., 0,1,2)",
    key: "is1Number",
  },
];

export const useCheckPasswordRequirements = () => {
  const [passwordReqMts, setPasswordReqMts] = useState<passwordReqMts>({
    is1UpperCase: false,
    is1LowerCase: false,
    is1SpecialCharacter: false,
    is1Number: false,
  });

  const checkPasswordReqMts = (password: string) => {
    const is1UpperCase = /[A-Z]/.test(password);
    const is1LowerCase = /[a-z]/.test(password);
    const is1SpecialCharacter = /[^A-Za-z0-9]/.test(password);
    const is1Number = /\d/.test(password);
    setPasswordReqMts({
      is1UpperCase: is1UpperCase,
      is1LowerCase: is1LowerCase,
      is1SpecialCharacter: is1SpecialCharacter,
      is1Number: is1Number,
    });
  };

  return {
    checkPasswordReqMts,
    passwordReqMts,
  };
};
