'use client'

import '../global.module.css'; // or use .module.css if converting previously

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}