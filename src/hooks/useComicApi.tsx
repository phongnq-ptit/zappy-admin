import React from 'react';
import useApi from './useApi';
import {
  ApiListResponse,
  ApiSingleResponse,
  QueryParams
} from 'src/types/interfaces/Base';
import { IAddNewComic, IComic } from 'src/types/interfaces/Comic';
import { convertFormData } from 'src/utils/Helper';

const useComicApi = () => {
  const { GET, POST, PATCH, DELETE } = useApi();
  const baseUrl = '/comics';

  function getComicLists(
    query?: QueryParams
  ): Promise<ApiListResponse<IComic[]>> {
    return GET<ApiListResponse<IComic[]>>(baseUrl, query);
  }

  async function deleteComic(
    ids: number[]
  ): Promise<ApiSingleResponse<IComic>> {
    return DELETE<ApiSingleResponse<IComic>>(baseUrl, { data: { ids } });
  }

  async function createComic(
    data: IAddNewComic
  ): Promise<ApiSingleResponse<IComic>> {
    return POST<ApiSingleResponse<IComic>>(baseUrl, convertFormData(data));
  }

  async function getComicById(id: number): Promise<ApiSingleResponse<IComic>> {
    return GET<ApiSingleResponse<IComic>>(baseUrl + `/${id}`);
  }

  async function updateComic(
    id: number,
    data: Partial<IAddNewComic>
  ): Promise<ApiSingleResponse<IComic>> {
    return PATCH<ApiSingleResponse<IComic>>(
      baseUrl + `/${id}`,
      convertFormData(data)
    );
  }

  return {
    getComicLists,
    createComic,
    getComicById,
    deleteComic,
    updateComic
  };
};

export default useComicApi;
