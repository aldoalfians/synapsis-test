import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import useQueryFetch from "@/utilities/hooks/useQueryFetch";

interface PaginationInfo {
  total: number;
  pages: number;
  page: number;
  limit: number;
  links: {
    previous: string | null;
    current: string;
    next: string | null;
  };
}

interface DefaultParams {
  page?: number;
  per_page?: number;
  [key: string]: string | number | undefined;
}

interface UseDataPaginationProps {
  dataSourceUrl: string;
  defaultParams?: DefaultParams;
  onFetchSuccess?: (data: any) => any;
  generatedParamsKey?: { [key: string]: string };
}

interface BaseResponse<T> {
  data?: T[];
  meta?: {
    pagination: PaginationInfo;
  };
}

const defaultGeneratedParams = {
  search: "q",
  tagged: "tagged_with",
};

function useDataPagination(
  {
    dataSourceUrl,
    defaultParams = { page: 1, per_page: 12 },
    onFetchSuccess,
    ...rest
  }: UseDataPaginationProps = {} as UseDataPaginationProps
) {
  const router = useRouter();

  const paramsObj = useMemo(() => {
    const queryParams = { ...defaultParams, ...router.query };
    return Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [
        key,
        value?.toString(),
      ])
    );
  }, [router.query, defaultParams]);

  const query = useQueryFetch<BaseResponse<any>>({
    url: dataSourceUrl,
    params: {
      ...paramsObj,
    },
    enabled: Boolean(dataSourceUrl),
    onSuccess: (data) => {
      return onFetchSuccess?.(data) || data;
    },
  });

  const queryResult: BaseResponse<any> = query.data || {};
  const pagination = queryResult.meta?.pagination;

  const goToPage = useCallback(
    (page: number, per_page?: number) => {
      if (typeof page !== "number") return;
      const isPerPageChanged = per_page !== Number(paramsObj.per_page);
      router.push({
        pathname: router.pathname,
        query: {
          ...paramsObj,
          per_page: per_page?.toString(),
          page: isPerPageChanged ? "1" : page.toString(),
        },
      });
    },
    [router, paramsObj]
  );

  const generatedParamsKey = useMemo(
    () => ({ ...defaultGeneratedParams, ...rest.generatedParamsKey }),
    [rest.generatedParamsKey]
  );

  const validateNextParams = useCallback(
    (nextParams: DefaultParams) =>
      Object.entries({
        ...paramsObj,
        ...nextParams,
      }).reduce(
        (acc, [key, value]) => ({
          ...acc,
          ...(value !== "" &&
            value !== null &&
            value !== undefined && {
              [key]: value,
            }),
        }),
        {} as DefaultParams
      ),
    [paramsObj]
  );

  const generatedParamsHelper = useMemo(
    () =>
      Object.entries(generatedParamsKey)
        .map(([aliasName, realParamName]) => ({
          [`${aliasName}Query`]: paramsObj?.[realParamName],
          [`${aliasName}ByQuery`](value: string | number) {
            router.push({
              pathname: router.pathname,
              query: {
                ...validateNextParams({
                  [realParamName]: value,
                }),
                page: "1",
              },
            });
          },
        }))
        .reduce((acc, item) => ({ ...acc, ...item }), {}),
    [generatedParamsKey, paramsObj, router, validateNextParams]
  );

  return {
    ...generatedParamsHelper,
    pagination: pagination,
    isLoading: query.isLoading,
    data: queryResult?.data || [],
    refetch: query.refetch,
    goToPage,
    setByQuery: (nextParams: DefaultParams = {}) => {
      router.push({
        pathname: router.pathname,
        query: {
          ...validateNextParams(nextParams),
          page: "1",
        },
      });
    },
    nextPage: () => {
      const nextPage =
        pagination && pagination.page < pagination.pages
          ? pagination.page + 1
          : pagination?.page;
      goToPage(nextPage || 1, pagination?.limit);
    },
    prevPage: () => {
      const prevPage =
        pagination && pagination.page > 1
          ? pagination.page - 1
          : pagination?.page;
      goToPage(prevPage || 1, pagination?.limit);
    },
  };
}

export default useDataPagination;
