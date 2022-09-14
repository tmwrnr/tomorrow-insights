import { Trans, useTranslation } from "next-i18next";
import React from "react";
import FileDropzone from "./FileDropzone";

type Props = {
  onDrop: (acceptedFiles: File[]) => void;
};
const Hero: React.FC<Props> = ({ onDrop }) => {
  const { t } = useTranslation();

  return (
    <div className=" container mx-auto flex grow flex-col items-center justify-center px-12 py-8 md:py-32 xl:-mb-20">
      <div className="max-w-md text-center">
        <h1 className="text-5xl font-bold">{t("hero.headline")}</h1>
        <p className="py-6">
          <Trans
            i18nKey="hero.description"
            defaults="Mit diesem Tool kann man sich einfach die Insights seines <0>Tomorrow</0> Kontos anschauen."
            components={[
              <a
                key="1"
                href="https://www.tomorrow.one/"
                target="_blank"
                rel="noreferrer"
                className="text-violet-500 hover:underline focus:outline-violet-500"
              >
                Tomorrow
              </a>,
            ]}
          />
        </p>

        <FileDropzone onDrop={onDrop} />
        <p className="py-6 text-xs text-gray-500">
          {t("hero.privacyDevice")}
          <br />
          {t("hero.privacyServer")}
        </p>
      </div>
    </div>
  );
};

export default Hero;
