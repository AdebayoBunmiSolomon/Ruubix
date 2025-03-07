export const maskPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber.length < 4) return phoneNumber;

  const countryCodeMatch = phoneNumber.match(/^\+\d+/);
  const countryCode = countryCodeMatch ? countryCodeMatch[0] : "";
  const maskedPart = "******";
  const lastTwoDigits = phoneNumber.slice(-2);

  return `${countryCode}${maskedPart}${lastTwoDigits}`;
};
