import useMutationSubmit from '@/utilities/hooks/useMutationSubmit';
import useDataPagination from '../useDataPagination';

interface UsePostMutatorProps {
  id?: number | string;
  user_id?: number | string;
  onSuccessAddPost?: () => void;
  onSuccessEditPost?: () => void;
  onSuccessDeletePost?: () => void;
  onError?: (e: any) => void;
}

function usePostMutator({
  id,
  onSuccessAddPost,
  onSuccessEditPost,
  onSuccessDeletePost,
  onError,
}: UsePostMutatorProps) {
  const {
    data: listData,
    isLoading: isLoadingListData,
    refetch: refetchListData,
    pagination,
    goToPage,
  } = useDataPagination({
    dataSourceUrl: 'posts',
  });

  const { submit: submitPost, isLoading: isLoadingSubmitPost } = useMutationSubmit({
    url: `/posts`,
    method: 'POST',
    onSuccess() {
      onSuccessAddPost?.();
      refetchListData();
    },
    onError(e) {
      console.log(e);
      onError?.(e);
    },
  });

  const { submit: submitEditPost, isLoading: isLoadingEditPost } = useMutationSubmit({
    url: `/posts/${id}`,
    method: 'PUT',
    onSuccess() {
      onSuccessEditPost?.();
      refetchListData();
    },
    onError(e) {
      onError?.(e);
    },
  });

  const { submit: submitDeletePost, isLoading: isLoadingDeletePost } = useMutationSubmit({
    url: `/posts/${id}`,
    method: 'DELETE',
    onSuccess() {
      onSuccessDeletePost?.();
      refetchListData();
    },
    onError(e) {
      onError?.(e);
    },
  });

  return {
    listData,
    isLoadingListData,
    refetchListData,
    pagination,
    goToPage,

    submitPost,
    isLoadingSubmitPost,

    submitEditPost,
    isLoadingEditPost,

    submitDeletePost,
    isLoadingDeletePost,
  };
}

export default usePostMutator;
