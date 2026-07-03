export const formatCurrencyInput = (value: string) => {
  const digitsOnly = value.replace(/\D/g, '');

  if (!digitsOnly) return '';

  if (digitsOnly.length <= 2) {
    return digitsOnly;
  }

  const integerPart = digitsOnly.slice(0, -2);
  const decimalPart = digitsOnly.slice(-2);
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${formattedInteger},${decimalPart}`;
};
