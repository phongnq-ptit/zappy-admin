import { useCallback, useState } from 'react';
import {
  ListMetadata,
  QueryParams,
  defaultListMetadata
} from 'src/types/interfaces/Base';
import { IChapter } from 'src/types/interfaces/Comic';
import { useBetween } from 'use-between';

function init() {
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const onChangeChapters = useCallback(
    (value: IChapter[]) => setChapters(value),
    []
  );

  const [selected, setSelected] = useState<number[]>([]);
  const onChangeSelected = useCallback(
    (value: number[]) => setSelected(value),
    []
  );

  const [listMetadata, setListMetadata] =
    useState<ListMetadata>(defaultListMetadata);
  const onChangeListMetadata = useCallback(
    (value: ListMetadata) => setListMetadata(value),
    []
  );

  const [queryParams, setQueryParams] = useState<QueryParams>({
    limit: 10,
    page: 1,
    search: undefined,
    filter: undefined
  });
  const onChangeQueryParams = useCallback(
    (value: QueryParams) => setQueryParams(value),
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQueryParams({
        ...queryParams,
        limit: Number(event.target.value),
        page: 1
      });
    },
    []
  );

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setQueryParams({ ...queryParams, page: newPage + 1 });
    },
    []
  );

  const [loading, setLoading] = useState(false);
  const onChangeLoading = useCallback(
    (value: boolean) => setLoading(value),
    []
  );

  return {
    listMetadata,
    onChangeListMetadata,
    queryParams,
    onChangeQueryParams,
    loading,
    onChangeLoading,
    handleChangePage,
    handleChangeRowsPerPage,
    chapters,
    onChangeChapters,
    selected,
    onChangeSelected
  };
}

export const useChapterStore = () => useBetween(init);
