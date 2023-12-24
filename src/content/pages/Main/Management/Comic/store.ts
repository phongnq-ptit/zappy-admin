import { useCallback, useState } from 'react';
import { Author } from 'src/types/interfaces/Author';
import {
  ApiListResponse,
  ListMetadata,
  QueryParams,
  defaultListMetadata
} from 'src/types/interfaces/Base';
import { IComic } from 'src/types/interfaces/Comic';
import { Genre } from 'src/types/interfaces/Genre';
import { useBetween } from 'use-between';

function init() {
  const [comics, setComics] = useState<IComic[]>([]);
  const onChangeComics = useCallback((value: IComic[]) => setComics(value), []);

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

  const [genres, setGenres] = useState<Genre[]>([]);
  const getComicGenres = (
    api: (params?: QueryParams) => Promise<ApiListResponse<Genre[]>>
  ) => {
    return api({ limit: 1000 }).then((response) => {
      setGenres(response.data.results);
    });
  };

  const [authors, setAuthors] = useState<Author[]>([]);
  const getComicAuthors = (
    api: (params?: QueryParams) => Promise<ApiListResponse<Author[]>>
  ) => {
    return api({ limit: 1000 }).then((response) => {
      setAuthors(response.data.results);
    });
  };

  const [tabs, setTabs] = useState<string>('summary');
  const onChangeTabs = useCallback((value: string) => setTabs(value), []);

  const [comic, setComic] = useState<IComic>({
    id: 999,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: '',
    minAge: 0,
    publishDate: new Date(),
    desc: '',
    thumbnail: '',
    views: 0,
    golds: 0,
    state: 1,
    genres: [],
    authors: [],
    chaptersCount: 0,
    isAccess: false,
    isLike: false,
    isPlaylist: false
  });
  const onChangeComic = useCallback((value: IComic) => setComic(value), []);

  const [reload, setReload] = useState(false);
  const refeshApi = useCallback(() => setReload(!reload), []);

  return {
    listMetadata,
    onChangeListMetadata,
    queryParams,
    onChangeQueryParams,
    loading,
    onChangeLoading,
    handleChangePage,
    handleChangeRowsPerPage,
    comics,
    onChangeComics,
    selected,
    onChangeSelected,
    genres,
    getComicGenres,
    authors,
    getComicAuthors,
    tabs,
    onChangeTabs,
    comic,
    onChangeComic,
    reload,
    refeshApi
  };
}

export const useComicStore = () => useBetween(init);
