import useApi from './useApi';
import {
  ApiListResponse,
  ApiSingleResponse,
  QueryParams
} from 'src/types/interfaces/Base';
import { Genre } from 'src/types/interfaces/Genre';

const useGenreApi = () => {
  const { GET, POST } = useApi();
  const baseUrl = '/genre';

  async function getGenreAll(
    params?: QueryParams
  ): Promise<ApiListResponse<Genre[]>> {
    return GET<ApiListResponse<Genre[]>>(baseUrl, params);
  }

  async function getGenreComic(
    params?: QueryParams
  ): Promise<ApiListResponse<Genre[]>> {
    return GET<ApiListResponse<Genre[]>>(baseUrl + '/comic', params);
  }

  async function getGenreMusic(
    params?: QueryParams
  ): Promise<ApiListResponse<Genre[]>> {
    return GET<ApiListResponse<Genre[]>>(baseUrl + '/music', params);
  }

  async function getGenreMovie(
    params?: QueryParams
  ): Promise<ApiListResponse<Genre[]>> {
    return GET<ApiListResponse<Genre[]>>(baseUrl + '/movie', params);
  }

  async function createGenre(
    newGenre: Genre
  ): Promise<ApiSingleResponse<Genre>> {
    return POST<ApiSingleResponse<Genre>>(baseUrl, newGenre);
  }

  return {
    getGenreAll,
    getGenreComic,
    getGenreMovie,
    getGenreMusic,
    createGenre
  };
};

export default useGenreApi;
