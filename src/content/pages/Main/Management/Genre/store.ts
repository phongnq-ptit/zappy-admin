import React, { useCallback, useState } from 'react';
import {
  ListMetadata,
  QueryParams,
  defaultListMetadata
} from 'src/types/interfaces/Base';
import { Genre } from 'src/types/interfaces/Genre';
import { useBetween } from 'use-between';

export enum EGenreTabs {
  ALL = '-1',
  COMIC = '0',
  MUSIC = '1',
  MOVIE = '2'
}

function init() {
  const [tabs, setTabs] = useState<EGenreTabs>(EGenreTabs.ALL);
  const onChangeTabs = useCallback((value: EGenreTabs) => setTabs(value), []);

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

  const [genres, setGenres] = useState<Genre[]>([]);
  const onChangeGenres = useCallback((value: Genre[]) => setGenres(value), []);

  const [reload, setReload] = useState<boolean>(false);
  const onChangeReload = useCallback(() => setReload(!reload), []);

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

  return {
    tabs,
    onChangeTabs,
    listMetadata,
    onChangeListMetadata,
    queryParams,
    onChangeQueryParams,
    genres,
    onChangeGenres,
    handleChangeRowsPerPage,
    handleChangePage,
    reload,
    onChangeReload
  };
}

export const useGenreStore = () => useBetween(init);
