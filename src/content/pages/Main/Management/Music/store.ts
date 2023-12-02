import { useCallback, useState } from 'react';
import { Author } from 'src/types/interfaces/Author';
import {
  ApiListResponse,
  ListMetadata,
  QueryParams,
  defaultListMetadata
} from 'src/types/interfaces/Base';
import { Genre } from 'src/types/interfaces/Genre';
import { IMusic } from 'src/types/interfaces/Music';
import { useBetween } from 'use-between';

function init() {
  const [musics, setMusics] = useState<IMusic[]>([]);
  const onChangeMusics = useCallback((value: IMusic[]) => setMusics(value), []);

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
  const getMovieGenres = (
    api: (params?: QueryParams) => Promise<ApiListResponse<Genre[]>>
  ) => {
    return api({ limit: 1000 }).then((response) => {
      setGenres(response.data.results);
    });
  };

  const [authors, setAuthors] = useState<Author[]>([]);
  const getMovieAuthors = (
    api: (params?: QueryParams) => Promise<ApiListResponse<Author[]>>
  ) => {
    return api({ limit: 1000 }).then((response) => {
      setAuthors(response.data.results);
    });
  };

  return {
    listMetadata,
    onChangeListMetadata,
    queryParams,
    onChangeQueryParams,
    loading,
    onChangeLoading,
    handleChangePage,
    handleChangeRowsPerPage,
    musics,
    onChangeMusics,
    selected,
    onChangeSelected,
    genres,
    getMovieGenres,
    authors,
    getMovieAuthors
  };
}

export const useMusicStore = () => useBetween(init);
