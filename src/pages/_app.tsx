import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import themeConfig from "@/theme/themeConfig";
import "antd/dist/reset.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ConfigProvider theme={themeConfig}>
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
}
