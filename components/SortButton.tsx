import { Menu, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import React, { Fragment } from "react";

export const SortOptions = ["date", "amount", "name", "co2"] as const;
type Option = typeof SortOptions[number];

type Props = {
  onChange: (sorting: Option) => void;
  sorting: Option;
};
const SortButton: React.FC<Props> = ({ onChange, sorting }) => {
  const { t } = useTranslation();

  return (
    <Menu as="div" className="relative z-10 inline-block text-left">
      <Menu.Button className="inline-flex w-full items-center justify-center rounded p-1 text-sm font-medium text-violet-500 hover:ring-2 hover:ring-violet-500 focus:outline-none focus:ring-opacity-75 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-opacity-75">
        <>
          <span className="sr-only">{t("sortBy")}</span>
          {t(sorting)}
        </>
        <ChevronUpDownIcon
          className="ml-1 h-4 w-4 text-violet-400"
          aria-hidden="true"
        />
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
          {SortOptions.map((option) => (
            <Menu.Item key={option}>
              {({ active }) => (
                <button
                  onClick={() => onChange(option)}
                  className={clsx(
                    "group flex w-full items-center rounded-md px-2 py-2 text-sm",
                    {
                      "bg-violet-500 text-white": active,
                    }
                  )}
                >
                  {t(option)}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SortButton;
