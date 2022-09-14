import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useCallback, useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Language from "../components/Language";
import Month from "../components/Month";
import MonthAverage from "../components/MonthAverage";
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
      <div className="relative flex min-h-screen flex-col bg-gray-50 text-gray-700">
        <div className="absolute top-3 right-3 max-w-md md:top-6 md:right-6">
          <Language />
        </div>
        {transactions.length > 0 && <Header />}
        <main className="flex grow flex-col ">
          {months.length > 0 ? (
            <ul className="container mx-auto my-10 max-w-4xl space-y-10 px-10 pb-10">
              {average && <MonthAverage average={average} />}
              {months.map((month) => (
                <Month month={month} key={month.key} />
              ))}
            </ul>
          ) : (
            <Hero onDrop={onDrop} />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "footer"])),
    },
  };
}

export default Home;
