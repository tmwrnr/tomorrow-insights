import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import FooterLink from "./FooterLink";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        viewBox="0 0 1440 320"
        className="lg:-mb-10"
      >
        <path
          fill="#8B5CF6"
          fillOpacity="1"
          d="M0,64L48,101.3C96,139,192,213,288,213.3C384,213,480,139,576,133.3C672,128,768,192,864,208C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <div className="bg-violet-500 px-10 py-6 text-violet-50 md:pt-0 md:pb-10">
        <div className="mx-auto max-w-md">
          <div className=" text-center text-xs">
            <Image
              layout="fixed"
              src="https://avatars.githubusercontent.com/u/39673874?s=40&v=4"
              alt="Profile image"
              width="40px"
              height="40px"
              className="h-10 w-10 rounded-full"
            />
            <div className="mt-2">
              {t("footer.madeBy")}{" "}
              <a
                href="https://github.com/tmwrnr"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-white focus:outline-violet-50"
              >
                tmwrnr
              </a>
            </div>
            <div className="mt-2 text-xs text-violet-200">Open Source</div>
          </div>
          <div className="mt-6">
            <h3 className="mb-1 text-center text-lg font-semibold text-violet-200">
              {t("footer.links")}
            </h3>
            <ul className="flex flex-col items-center space-y-1 text-sm sm:flex-row sm:flex-wrap sm:justify-center sm:space-y-0 sm:space-x-3">
              <li>
                <FooterLink href="/example.csv" text={t("footer.exampleCSV")} />
              </li>
              <li>
                <FooterLink
                  href="https://github.com/tmwrnr/tomorrow-insights"
                  text="Github"
                />
              </li>
              <li>
                <FooterLink
                  href="https://github.com/tmwrnr/tomorrow-insights/issues"
                  text={t("footer.feedback")}
                />
              </li>
              <li>
                <FooterLink href="https://www.tomorrow.one/" text="Tomorrow" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
