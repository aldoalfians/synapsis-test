import { useMutation, UseMutationResult } from "@tanstack/react-query";
import useFetchApi from "./useFetchApi";
import useToastError from "./useToastError";

interface UseMutationSubmitParams {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  payload?: any;
  params?: Record<string, string>;
  isUseAuth?: boolean;
  isToastError?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  retry?: number | boolean;
  [key: string]: any;
}

interface UseMutationSubmitReturn {
  submit?: UseMutationResult<any, Error, any, any>["mutate"];
  data?: any;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  errMessage?: Error | null;
}

const useMutationSubmit = ({
  url,
  method = "POST",
  headers,
  payload,
  params,
  isUseAuth = true,
  isToastError = true,
  onSuccess,
  onError,
  retry = false,
  ...rest
}: UseMutationSubmitParams): UseMutationSubmitReturn => {
  const submitFn = useFetchApi({
    url,
    method,
    headers,
    payload,
    params,
    onSuccess,
    onError,
    isUseAuth,
    ...rest,
  });

  const {
    mutate: submit,
    data,
    status,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: submitFn,
    retry,
  });

  const errMessage = error || null;

  useToastError(isToastError && errMessage);

  return {
    submit,
    data,
    isLoading: status === "pending",
    isError,
    isSuccess,
    errMessage,
  };
};

export default useMutationSubmit;
