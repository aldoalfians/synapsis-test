import { AxiosRequestConfig, AxiosResponse } from 'axios';
import api from './api';
import { getAuthHeader } from './authorization';

interface FetchRequest {
  url: string;
  params: Record<string, any>;
  payload: Record<string, any>;
  headers: Record<string, string>;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  isUseAuth: boolean;
}

interface FetchCallback {
  onSuccess?: (data: any, request: FetchRequest) => any;
  onError?: (err: any, request: FetchRequest) => string | void;
}

export type FetchOption = FetchRequest &
  FetchCallback &
  Omit<AxiosRequestConfig, keyof FetchRequest>;

async function fetchApi({
  url,
  method,
  payload = {},
  params = {},
  headers = {},
  onSuccess,
  onError,
  isUseAuth = true,

  ...rest
}: Partial<FetchOption> = {}): Promise<any> {
  if (!url || !method) {
    throw new Error('URL and method are required');
  }

  return new Promise((resolve, reject) => {
    const request: FetchRequest = {
      url,
      method,
      headers,
      params,
      isUseAuth,
      payload,
    };

    const finalHeaders = {
      ...headers,
      ...getAuthHeader(),
    };

    const finalPayload = payload;

    let axiosFetch: Promise<AxiosResponse>;

    axiosFetch = api({
      ...(Object.keys(finalPayload).length > 0 && { data: finalPayload }),
      ...(Object.keys(params).length > 0 && { params }),
      headers: finalHeaders,
      method,
      url,

      ...rest,
    });

    axiosFetch
      .then((response) => {
        const { data } = response;
        if (typeof data?.success === 'boolean' && data?.success === false) {
          throw new Error(data?.message);
        }

        if (onSuccess) {
          resolve(onSuccess(data, request));
          return;
        }
        resolve(data?.data || data);
      })
      .catch((e) => {
        console.error(e);
        const errResult = onError?.(e, request);

        const errorMessage =
          (typeof errResult === 'string' ? errResult : null) ||
          (typeof e?.response?.error === 'string' ? e.response.error : null) ||
          e?.response?.data?.message ||
          e?.message ||
          'Terjadi kesalahan, silahkan coba beberapa saat lagi';

        reject(errorMessage);
      });
  });
}

export default fetchApi;
