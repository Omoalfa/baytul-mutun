export const formatToNaira = (amountInKobo: number): string => {
  const naira = Math.floor(amountInKobo / 100);
  const kobo = amountInKobo % 100;
  
  return `₦${naira.toLocaleString()}${kobo > 0 ? `:${kobo.toString().padStart(2, '0')}` : ''}`;
};
