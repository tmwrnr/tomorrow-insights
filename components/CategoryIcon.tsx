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
      return <EllipsisHorizontalIcon className={className} />;
    case "Bargeld":
      return <BanknotesIcon className={className} />;
    case "Bildung":
      return <BookOpenIcon className={className} />;
    case "Elektronik":
      return <ComputerDesktopIcon className={className} />;
    case "Familie & Freunde":
      return <UsersIcon className={className} />;
    case "Freizeit & Medien":
      return <FilmIcon className={className} />;
    case "Gastronomie":
      return <CakeIcon className={className} />;
    case "Gehalt":
      return <FaceSmileIcon className={className} />;
    case "Geschäftliches":
      return <BriefcaseIcon className={className} />;
    case "Gesundheit & Drogerie":
      return <PlusIcon className={className} />;
    case "Gutschrift":
      return <ArrowDownTrayIcon className={className} />;
    case "Haushalt":
      return <HomeIcon className={className} />;
    case "Investments":
      return <ArrowTrendingUpIcon className={className} />;
    case "Lastschrift":
      return <ArrowUpTrayIcon className={className} />;
    case "Lebensmittel":
      return <ShoppingCartIcon className={className} />;
    case "Reisen":
      return <SunIcon className={className} />;
    case "Shopping":
      return <ShoppingBagIcon className={className} />;
    case "Sparen":
      return <FlagIcon className={className} />;
    case "Spenden":
      return <HeartIcon className={className} />;
    case "Steuern":
      return <ReceiptPercentIcon className={className} />;
    case "Transport":
      return <TruckIcon className={className} />;
    case "Versicherung":
      return <FireIcon className={className} />;
    case "Überweisung":
      return <PaperAirplaneIcon className={className} />;
  }
};

export default React.memo(CategoryIcon);
