import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useState } from "react";
import Card from "../components/Card";
import CardHeadline from "../components/CardHeadline";
import CardItem from "../components/CardItem";

import FileDropzone from "../components/FileDropzone";
import Header from "../components/Header";
import Month from "../components/Month";
import {
  getAverageMonth,
  getTransactionsPerMonth,
  prepareData,
} from "../helpers/transaction";
import { Month as MonthType } from "../types/month";
import { Transaction } from "../types/transaction";

const Home: NextPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [months, setMonths] = useState<MonthType[]>([]);
  const [average, setAverage] = useState<MonthType | undefined>(undefined);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const transactions = await prepareData(acceptedFiles);
    const months = getTransactionsPerMonth(transactions);

    setTransactions(transactions);
    setMonths(months);
    setAverage(getAverageMonth(months));
  }, []);

  return (
    <>
      <Head>
        <title key="title">Tomorrow Insights</title>
        <meta key="keywords" name="keywords" content="Tomorrow,Insights" />
        <meta key="description" name="description" content="" />
        <meta key="og-title" property="og:title" content="Tomorrow Insights" />
        <meta
          key="og-description"
          property="og:description"
          content="Mit diesem Tool kann man sich einfach die Insights seines Tomorrow Kontos anschauen"
        />
        {/* TODO replace og:url */}
        <meta key="og-url" property="og:url" content="" />
        <meta
          key="twitter-title"
          name="twitter:title"
          content="Tomorrow Insights"
        />
        <meta
          key="twitter-description"
          name="twitter:description"
          content="Mit diesem Tool kann man sich einfach die Insights seines Tomorrow Kontos anschauen"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1.00001, viewport-fit=cover"
        />
        <meta name="author" content="Tim Werner" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:site_name" content="Tomorrow Insights" />
        <meta property="og:image" content="/opg.png" />
        <meta property="og:image:url" content="/opg.png" />
        <meta property="og:image:secure" content="/opg.png" />
        <meta property="og:image:secure_url" content="/opg.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </Head>
      <div className="flex min-h-screen flex-col bg-gray-50 text-gray-700">
        {transactions.length > 0 && <Header />}
        <main className="flex grow flex-col ">
          {months.length > 0 ? (
            <ul className="container mx-auto mt-10 max-w-4xl space-y-10 px-10 pb-10">
              {average && (
                <li>
                  <CardHeadline
                    text={average.name}
                    income={average.income}
                    expenses={average.expenses}
                  />
                  <Card>
                    {average.categories.map((c) => (
                      <CardItem
                        key={c.name}
                        name={c.name}
                        selected={false}
                        transactions={c.transactions.length}
                        sum={c.sum}
                        expensesPercent={c.expensesPercent}
                      />
                    ))}
                  </Card>
                </li>
              )}
              {months.map((month) => (
                <Month month={month} key={month.key} />
              ))}
            </ul>
          ) : (
            <div className=" container mx-auto flex grow flex-col items-center justify-center px-12 py-8 md:py-32">
              <div className="max-w-md text-center">
                <h1 className="text-5xl font-bold">Tomorrow Insights</h1>
                <p className="py-6">
                  Mit diesem Tool kann man sich einfach die Insights seines{" "}
                  <a
                    href="https://www.tomorrow.one/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-violet-500 hover:underline"
                  >
                    Tomorrow
                  </a>{" "}
                  Kontos anschauen.
                </p>

                <FileDropzone onDrop={onDrop} />
                <p className="py-6 text-xs text-gray-500">
                  Alle Daten bleiben auf dem Gerät! <br />
                  Es werden keine Daten an irgendeinen Server gesendet!
                </p>
              </div>
            </div>
          )}
        </main>
        <footer className="lg:-mt-20">
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
          <div className="bg-violet-500 px-10 py-6 text-violet-50 md:pt-0">
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
                  Made by{" "}
                  <a
                    href="https://github.com/tmwrnr"
                    target="_blank"
                    rel="noreferrer"
                    className=" underline hover:text-white"
                  >
                    tmwrnr
                  </a>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="mb-1 text-center text-lg font-semibold text-violet-200">
                  Links
                </h3>
                <ul className="space flex flex-wrap justify-center space-x-2 text-sm">
                  <li>
                    <a
                      href="/example.csv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white hover:underline"
                    >
                      Beispiel CSV
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/tmwrnr/tomorrow-insights"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white hover:underline"
                    >
                      Source Code
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tomorrow.one/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white hover:underline"
                    >
                      Tomorrow
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
