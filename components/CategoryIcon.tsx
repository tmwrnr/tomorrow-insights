import {
  ArrowDownTrayIcon,
  ArrowTrendingUpIcon,
  ArrowUpTrayIcon,
  BanknotesIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CakeIcon,
  ComputerDesktopIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  FilmIcon,
  FireIcon,
  FlagIcon,
  HeartIcon,
  HomeIcon,
  PaperAirplaneIcon,
  PlusIcon,
  ReceiptPercentIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  SunIcon,
  TruckIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import React from "react";

import { Category } from "../types/transaction";

type Props = {
  category: Category;
  className?: string;
};

const CategoryIcon: React.FC<Props> = ({ category, className }) => {
  switch (category) {
    case "Andere":
      return (
        <EllipsisHorizontalIcon className={className} aria-hidden="true" />
      );
    case "Bargeld":
      return <BanknotesIcon className={className} aria-hidden="true" />;
    case "Bildung":
      return <BookOpenIcon className={className} aria-hidden="true" />;
    case "Elektronik":
      return <ComputerDesktopIcon className={className} aria-hidden="true" />;
    case "Familie & Freunde":
      return <UsersIcon className={className} aria-hidden="true" />;
    case "Freizeit & Medien":
      return <FilmIcon className={className} aria-hidden="true" />;
    case "Gastronomie":
      return <CakeIcon className={className} aria-hidden="true" />;
    case "Gehalt":
      return <FaceSmileIcon className={className} aria-hidden="true" />;
    case "Geschäftliches":
      return <BriefcaseIcon className={className} aria-hidden="true" />;
    case "Gesundheit & Drogerie":
      return <PlusIcon className={className} aria-hidden="true" />;
    case "Gutschrift":
      return <ArrowDownTrayIcon className={className} aria-hidden="true" />;
    case "Haushalt":
      return <HomeIcon className={className} aria-hidden="true" />;
    case "Investments":
      return <ArrowTrendingUpIcon className={className} aria-hidden="true" />;
    case "Lastschrift":
      return <ArrowUpTrayIcon className={className} aria-hidden="true" />;
    case "Lebensmittel":
      return <ShoppingCartIcon className={className} aria-hidden="true" />;
    case "Reisen":
      return <SunIcon className={className} aria-hidden="true" />;
    case "Shopping":
      return <ShoppingBagIcon className={className} aria-hidden="true" />;
    case "Sparen":
      return <FlagIcon className={className} aria-hidden="true" />;
    case "Spenden":
      return <HeartIcon className={className} aria-hidden="true" />;
    case "Steuern":
      return <ReceiptPercentIcon className={className} aria-hidden="true" />;
    case "Transport":
      return <TruckIcon className={className} aria-hidden="true" />;
    case "Versicherung":
      return <FireIcon className={className} aria-hidden="true" />;
    case "Überweisung":
      return <PaperAirplaneIcon className={className} aria-hidden="true" />;
  }
};

export default React.memo(CategoryIcon);
