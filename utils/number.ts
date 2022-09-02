/**
 * Round a number to a given precision
 */
export const round = (number: number, decimals: number) => {
  const factorOfTen = Math.pow(10, decimals);
  return Math.round((number + Number.EPSILON) * factorOfTen) / factorOfTen;
};
