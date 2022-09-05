export type AccountType = "Hauptkonto" | "Pockets" | "Partner*innenkonto";
export type BookingType = "Gutschrift" | "Lastschrift" | "Kartenzahlung";
export type Category =
  | "Andere"
  | "Bargeld"
  | "Bildung"
  | "Elektronik"
  | "Familie & Freunde"
  | "Freizeit & Medien"
  | "Gastronomie"
  | "Gehalt"
  | "Geschäftliches"
  | "Gesundheit & Drogerie"
  | "Gutschrift"
  | "Haushalt"
  | "Investments"
  | "Lastschrift"
  | "Lebensmittel"
  | "Reisen"
  | "Shopping"
  | "Sparen"
  | "Spenden"
  | "Steuern"
  | "Transport"
  | "Versicherung"
  | "Überweisung";

export type TransactionImport = {
  account_type: AccountType;
  amount: string; // "1.200"
  booking_date: string; // "2022-08-02"
  booking_type: BookingType;
  category: Category;
  co2_footprint_in_grams: string; // "17.300"
  currency: string;
  description: string;
  iban: string;
  sender_or_recipient: string;
  valuta_date: string; // "2022-08-02"
};

export type Transaction = {
  id: string;
  accountType: AccountType;
  amount: number;
  bookingDate: string;
  bookingType: BookingType;
  category: Category;
  co2FootprintInGrams: number;
  currency: string;
  description: string;
  iban: string;
  senderOrRecipient: string;
  valutaDate: string;
};
