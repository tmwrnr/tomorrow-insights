import type { NextPage } from "next";
import Image from "next/image";
import { useCallback, useState } from "react";

import FileDropzone from "../components/FileDropzone";
import Header from "../components/Header";
import Month from "../components/Month";
import { getTransactionsPerMonth, prepareData } from "../helpers/transaction";
import { Month as MonthType } from "../types/month";
import { Transaction } from "../types/transaction";

const Home: NextPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [months, setMonths] = useState<MonthType[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const transactions = await prepareData(acceptedFiles);
    const months = getTransactionsPerMonth(transactions);

    setTransactions(transactions);
    setMonths(months);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-700">
      {transactions.length > 0 && <Header />}
      <main className="flex grow flex-col ">
        {months.length > 0 ? (
          <ul className=" container mx-auto mt-10 max-w-3xl space-y-10 px-10 pb-10">
            {months.map((month) => (
              <Month month={month} key={month.key} />
            ))}
          </ul>
        ) : (
          <div className=" container mx-auto flex grow flex-col items-center justify-center  py-32">
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
      <footer className=" bg-violet-500 p-4 text-violet-50">
        <div className="flex justify-center">
          <a
            href="https://github.com/tmwr"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center rounded-lg p-2 hover:bg-violet-400 hover:text-white"
          >
            <Image
              layout="fixed"
              src="https://avatars.githubusercontent.com/u/39673874?s=40&v=4"
              alt="Profile image"
              width="40px"
              height="40px"
              className="h-10 w-10 rounded-full"
            />
            <span className="mt-1 text-sm">Tim Werner</span>
          </a>
        </div>
        <div className="text-center">
          <a
            href="https://github.com/tmwrnr/tomorrow-insights"
            target="_blank"
            rel="noreferrer"
            className="text-xs hover:text-white hover:underline"
          >
            Open Source
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
