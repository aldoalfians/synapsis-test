import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FetchOption } from '../fetchApi';
import useFetchApi from './useFetchApi';
import useToastError from './useToastError';

interface QueryFetchBaseArgs {
  enabled?: boolean | null;
  retry?: boolean | number;
  isToastError?: boolean;
  cacheTime?: number;
}

type QueryFetchOptions = Partial<FetchOption> & QueryFetchBaseArgs;

interface QueryFetchResult<T = any> {
  data: T | undefined;
  isLoading: boolean;
  errMessage: string | null;
  refetch: () => Promise<any>;
}

function useQueryFetch<T = any>({
  url,
  payload = {},
  params = {},
  headers = {},
  method = 'GET',
  retry = false,
  onSuccess,
  enabled = null,
  isUseAuth = true,
  isToastError = true,
  cacheTime = 0,
  ...rest
}: QueryFetchOptions): QueryFetchResult<T> {
  const fetchApi = useFetchApi({
    url,
    method,
    headers,
    payload,
    params,
    onSuccess,
    isUseAuth,
    ...rest,
  });

  const queryKey = useMemo(
    () => [
      url,
      ...(Object.keys(params).length > 0 ? [params] : []),
      ...(Object.keys(payload).length > 0 ? [payload] : []),
    ],
    [url, JSON.stringify(params), JSON.stringify(payload)]
  );

  const {
    data,
    error,
    isFetching: isLoading,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: fetchApi,
    retry,
    ...(enabled !== null && { enabled }),
  });

  const errMessage = error instanceof Error ? error?.message : null;

  useToastError(isToastError ? errMessage : null);

  return {
    data,
    isLoading,
    errMessage,
    refetch,
  };
}

export default useQueryFetch;
