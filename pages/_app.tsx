import React from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/global.css";
import "../styles/pages/login.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
