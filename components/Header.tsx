import { useTranslation } from "next-i18next";
import React from "react";

const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="flex justify-center pt-10">
      <h1 className="text-3xl font-semibold ">{t("hero.headline")}</h1>
    </header>
  );
};

export default React.memo(Header);
