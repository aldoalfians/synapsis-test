import { useCallback } from "react";
import { AxiosRequestConfig } from "axios";
import fetchApi, { FetchOption } from "../fetchApi";

const useFetchApi = (param: Partial<FetchOption>) => {
  return useCallback(
    (
      payload: Record<string, any> = {},
      headers?: any,
      axiosConfig: Partial<AxiosRequestConfig> = {}
    ): Promise<any> =>
      fetchApi({
        ...param,
        ...(Object.keys(payload).length > 0 && { payload }),
        ...(headers && { headers }),
        ...axiosConfig,
      }),
    [JSON.stringify(param)]
  );
};

export default useFetchApi;
