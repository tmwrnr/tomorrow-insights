import { i18n } from "next-i18next";
import { round } from "./number";

/**
 * Format a euro string number to a number
 * @example "1.200,40 €" => 1200.4
 */
export const euroStringToNumber = (s: string): number =>
  Number(s.replace(/[^0-9\,-]+/g, "").replace(",", "."));

const EuroFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
/**
 * Format a number to a euro currency
 */
export const formatEuro = (amount: number, absolute = false) =>
  EuroFormatter.format(absolute ? Math.abs(amount) : amount);

const DecimalFormatter = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: "decimal",
});
/**
 * Format a number to a two digital decimal number
 */
export const formatDecimal = (number: number) =>
  DecimalFormatter.format(number);

/**
 * Format a number to a two digital percent number
 * @param percent
 * @param absolute
 * @returns
 */
export const formatPercent = (percent: number, absolute = false): string => {
  const rounded = round(absolute ? Math.abs(percent * 100) : percent * 100, 2);
  return formatDecimal(rounded) + " %";
};

export const formatDateString = (date: string): string =>
  new Intl.DateTimeFormat(i18n?.language, {
    day: "2-digit",
    month: "long",
  }).format(new Date(date));

const MassUnitFormatter = new Intl.NumberFormat("de-DE", {
  maximumFractionDigits: 2,
});
export const formatMassUnit = (gramm: number) => {
  if (gramm < 1000) {
    return gramm + " g";
  }
  if (gramm < 1000_000) {
    return MassUnitFormatter.format(round(gramm / 1000, 1)) + " kg";
  }
  return MassUnitFormatter.format(gramm / 1000_000) + " t";
};
