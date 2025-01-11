import "@/styles/globals.scss";
import { inter } from "@/styles/fonts";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/user.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Post Invest Pro</title>
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
