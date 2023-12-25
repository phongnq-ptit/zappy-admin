import React from 'react';
import useApi from './useApi';
import {
  ApiListResponse,
  ApiSingleResponse,
  QueryParams
} from 'src/types/interfaces/Base';
import { IAddNewChapter, IChapter } from 'src/types/interfaces/Comic';
import { convertFormData } from 'src/utils/Helper';
import { MovieState } from 'src/types/enums/MovieState';

const useChapterApi = () => {
  const { GET, POST, PUT, DELETE } = useApi();
  const baseUrl = '/chapter';

  function getChapterLists(
    comicId: number,
    query?: QueryParams
  ): Promise<ApiListResponse<IChapter[]>> {
    return GET<ApiListResponse<IChapter[]>>(baseUrl + `/${comicId}`, query);
  }

  async function deleteChapter(
    ids: number[]
  ): Promise<ApiSingleResponse<IChapter>> {
    return DELETE<ApiSingleResponse<IChapter>>(baseUrl, { data: { ids } });
  }

  async function createChapter(
    data: IAddNewChapter
  ): Promise<ApiSingleResponse<IChapter>> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('chap', String(data.chap));
    formData.append('comicId', String(data.comicId));
    formData.append('state', String(data.state));
    for (let i = 0; i < data.images.length; i++) {
      formData.append('images', data.images[i]);
    }
    return POST<ApiSingleResponse<IChapter>>(baseUrl, formData);
  }

  async function getChapterById(
    id: number
  ): Promise<ApiSingleResponse<IChapter>> {
    return GET<ApiSingleResponse<IChapter>>(baseUrl + `/${id}/detail`);
  }

  async function updateChapter(
    id: number,
    state: MovieState
  ): Promise<ApiSingleResponse<IChapter>> {
    return PUT<ApiSingleResponse<IChapter>>(baseUrl + `/${id}`, { state });
  }

  return {
    getChapterLists,
    deleteChapter,
    createChapter,
    getChapterById,
    updateChapter
  };
};

export default useChapterApi;
