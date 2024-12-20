import "@/styles/globals.scss";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/user.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>BM App</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
