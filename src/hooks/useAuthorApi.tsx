import useApi from './useApi';
import {
  ApiListResponse,
  ApiSingleResponse,
  QueryParams
} from 'src/types/interfaces/Base';
import { Author, INewAuthor } from 'src/types/interfaces/Author';
import { convertFormData } from 'src/utils/Helper';

const useAuthorApi = () => {
  const { GET, POST, PATCH } = useApi();
  const baseUrl = '/author';

  async function getAuthorAll(
    params?: QueryParams
  ): Promise<ApiListResponse<Author[]>> {
    return GET<ApiListResponse<Author[]>>(baseUrl, params);
  }

  async function getAuthorComic(
    params?: QueryParams
  ): Promise<ApiListResponse<Author[]>> {
    return GET<ApiListResponse<Author[]>>(baseUrl + '/comic', params);
  }

  async function getAuthorMusic(
    params?: QueryParams
  ): Promise<ApiListResponse<Author[]>> {
    return GET<ApiListResponse<Author[]>>(baseUrl + '/music', params);
  }

  async function getAuthorMovie(
    params?: QueryParams
  ): Promise<ApiListResponse<Author[]>> {
    return GET<ApiListResponse<Author[]>>(baseUrl + '/movie', params);
  }

  async function createAuthor(
    newAuthor: INewAuthor
  ): Promise<ApiSingleResponse<Author>> {
    return POST<ApiSingleResponse<Author>>(baseUrl, convertFormData(newAuthor));
  }

  async function updateAuthor(
    id: number,
    AuthorUpdate: Partial<INewAuthor>
  ): Promise<ApiSingleResponse<Author>> {
    return PATCH<ApiSingleResponse<Author>>(
      baseUrl + `/${id}`,
      convertFormData(AuthorUpdate)
    );
  }

  return {
    getAuthorAll,
    getAuthorComic,
    getAuthorMovie,
    getAuthorMusic,
    createAuthor,
    updateAuthor
  };
};

export default useAuthorApi;
