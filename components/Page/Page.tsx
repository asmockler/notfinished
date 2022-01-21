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

      {children}
    </>
  );
}
