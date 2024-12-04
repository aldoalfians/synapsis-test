import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import themeConfig from "@/theme/themeConfig";
import "antd/dist/reset.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={themeConfig}>
          <Component {...pageProps} />
        </ConfigProvider>
      </QueryClientProvider>
    </>
  );
}
