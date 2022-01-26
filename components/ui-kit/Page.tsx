import Head from "next/head";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Page({ children }: Props) {
  return (
    <>
      <Head>
        <title>~~~~</title>
        <meta name="description" content="!!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="
          bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200
        "
      >
        {children}
      </div>
    </>
  );
}
