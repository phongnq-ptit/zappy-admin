import React from 'react';
import useApi from './useApi';
import {
  ApiListResponse,
  ApiSingleResponse,
  QueryParams
} from 'src/types/interfaces/Base';
import { IAddNewMovie, IMovie } from 'src/types/interfaces/Movie';
import { convertFormData } from 'src/utils/Helper';
import useMediaApi from './useMediaApi';

const useMovieApi = () => {
  const { GET, POST, PUT, DELETE } = useApi();
  const { M_GET, M_POST } = useMediaApi();
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

  async function createMovie(
    data: IAddNewMovie
  ): Promise<ApiSingleResponse<IMovie>> {
    return POST<ApiSingleResponse<IMovie>>(baseUrl, convertFormData(data));
  }

  async function getMovieById(id: number): Promise<ApiSingleResponse<IMovie>> {
    return GET<ApiSingleResponse<IMovie>>(baseUrl + `/${id}`);
  }

  async function upVideo(
    id: number,
    data: { movie: File }
  ): Promise<ApiSingleResponse<string>> {
    return M_POST<ApiSingleResponse<string>>(
      `${baseUrl}/upload/${id}`,
      convertFormData(data)
    );
  }

  async function updateMovie(
    id: number,
    data: Partial<IAddNewMovie>
  ): Promise<ApiSingleResponse<IMovie>> {
    return PUT<ApiSingleResponse<IMovie>>(
      baseUrl + `/${id}`,
      convertFormData(data)
    );
  }

  return {
    getMovieLists,
    deleteMovies,
    createMovie,
    getMovieById,
    updateMovie,
    upVideo
  };
};

export default useMovieApi;
