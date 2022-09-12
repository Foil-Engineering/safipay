import React from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/global.css";
import "../styles/components/sidebar.scss";
import "../styles/pages/login.scss";
import "../styles/pages/home.scss";
import "../styles/pages/invoice.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
