import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import themeConfig from "@/theme/themeConfig";
import "antd/dist/reset.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AuthroziationModal from "@/components/AuthroziationModal";
import { useGetLoggedUser } from "@/utilities/authorization";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const userData = useGetLoggedUser();

  useEffect(() => {
    if (userData) {
      return setIsOpen(false);
    }

    return setIsOpen(true);
  }, [userData]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={themeConfig}>
          {userData && <Component {...pageProps} />}
          <AuthroziationModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </ConfigProvider>
      </QueryClientProvider>
    </>
  );
}
