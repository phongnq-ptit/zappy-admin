import { useCallback, useState } from 'react';
import { Author } from 'src/types/interfaces/Author';
import {
  ListMetadata,
  QueryParams,
  defaultListMetadata
} from 'src/types/interfaces/Base';
import { useBetween } from 'use-between';

export enum EAuthorTabs {
  ALL = '-1',
  COMIC = '0',
  MUSIC = '1',
  MOVIE = '2'
}

function init() {
  const [tabs, setTabs] = useState<EAuthorTabs>(EAuthorTabs.ALL);
  const onChangeTabs = useCallback((value: EAuthorTabs) => setTabs(value), []);

  const [listMetadata, setListMetadata] =
    useState<ListMetadata>(defaultListMetadata);
  const onChangeListMetadata = useCallback(
    (value: ListMetadata) => setListMetadata(value),
    []
  );

  const [queryParams, setQueryParams] = useState<QueryParams>({
    limit: 10,
    page: 1,
    search: undefined
  });
  const onChangeQueryParams = useCallback(
    (value: QueryParams) => setQueryParams(value),
    []
  );

  const [reload, setReload] = useState<boolean>(false);
  const onChangeReload = useCallback(() => setReload(!reload), []);

  const [authors, setAuthors] = useState<Author[]>([]);
  const onChangeAuthors = useCallback(
    (value: Author[]) => setAuthors(value),
    []
  );

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQueryParams({
      ...queryParams,
      limit: Number(event.target.value),
      page: 1
    });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setQueryParams({ ...queryParams, page: newPage + 1 });
  };

  const [skeletonLoading, setSkeletonLoading] = useState<boolean>(false);
  const onChangeSkeletonLoading = useCallback(
    (value: boolean) => setSkeletonLoading(value),
    []
  );

  return {
    tabs,
    onChangeTabs,
    listMetadata,
    onChangeListMetadata,
    queryParams,
    onChangeQueryParams,
    handleChangeRowsPerPage,
    handleChangePage,
    reload,
    onChangeReload,
    authors,
    onChangeAuthors,
    skeletonLoading,
    onChangeSkeletonLoading
  };
}

export const useAuthorStore = () => useBetween(init);
