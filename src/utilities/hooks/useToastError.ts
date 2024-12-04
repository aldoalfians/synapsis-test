import { useEffect } from "react";
import { notification } from "antd";

const useToastError = (errMessage: string | any | null = null) => {
  useEffect(() => {
    if (errMessage) {
      notification.open({
        type: "error",
        message: "Error",
        description: errMessage,
        placement: "top",
      });
    }
  }, [errMessage]);
};

export default useToastError;
