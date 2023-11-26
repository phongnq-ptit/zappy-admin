import React from 'react';
import useApi from './useApi';
import {
  ApiListResponse,
  ApiSingleResponse,
  QueryParams
} from 'src/types/interfaces/Base';
import { IMovie } from 'src/types/interfaces/Movie';

const useMovieApi = () => {
  const { GET, POST, PUT, DELETE } = useApi();
  const baseUrl = '/movie';

  function getMovieLists(
    query?: QueryParams
  ): Promise<ApiListResponse<IMovie[]>> {
    return GET<ApiListResponse<IMovie[]>>(baseUrl, query);
  }

  async function deleteMovies(
    ids: number[]
  ): Promise<ApiSingleResponse<IMovie>> {
    return DELETE<ApiSingleResponse<IMovie>>(baseUrl, { data: { ids } });
  }

  return {
    getMovieLists,
    deleteMovies
  };
};

export default useMovieApi;
