import { Menu, Transition } from "@headlessui/react";
import { LanguageIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Fragment } from "react";

const Language = () => {
  const { t } = useTranslation();
  return (
    <Menu as="div" className="">
      <Menu.Button className="inline-flex items-center justify-center rounded p-1 text-2xl font-medium text-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500">
        <span className="sr-only">{t("language.switch")}</span>
        <LanguageIcon className="h-5 w-5" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white px-1 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item key="de">
            {({ active }) => (
              <Link href="/" locale="de">
                <button
                  className={clsx(
                    "group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-violet-500 hover:text-white",
                    {
                      "bg-violet-500 text-white": active,
                    }
                  )}
                >
                  {t("language.german")}
                </button>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item key="en">
            {({ active }) => (
              <Link href="/" locale="en">
                <button
                  className={clsx(
                    "group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-violet-500 hover:text-white",
                    {
                      "bg-violet-500 text-white": active,
                    }
                  )}
                >
                  {t("language.english")}
                </button>
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Language;
