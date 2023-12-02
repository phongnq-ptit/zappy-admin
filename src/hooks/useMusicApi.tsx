import React from 'react';
import useApi from './useApi';
import {
  ApiListResponse,
  ApiSingleResponse,
  QueryParams
} from 'src/types/interfaces/Base';
import { convertFormData } from 'src/utils/Helper';
import useMediaApi from './useMediaApi';
import { IAddNewMusic, IMusic } from 'src/types/interfaces/Music';

const useMusicApi = () => {
  const { GET, POST, PUT, DELETE } = useApi();
  const { M_GET, M_POST } = useMediaApi();
  const baseUrl = '/music';

  function getMusicLists(
    query?: QueryParams
  ): Promise<ApiListResponse<IMusic[]>> {
    return GET<ApiListResponse<IMusic[]>>(baseUrl, query);
  }

  async function deleteMusics(
    ids: number[]
  ): Promise<ApiSingleResponse<IMusic>> {
    return DELETE<ApiSingleResponse<IMusic>>(baseUrl, { data: { ids } });
  }

  async function createMusic(
    data: IAddNewMusic
  ): Promise<ApiSingleResponse<IMusic>> {
    return POST<ApiSingleResponse<IMusic>>(baseUrl, convertFormData(data));
  }

  async function getMusicById(id: number): Promise<ApiSingleResponse<IMusic>> {
    return GET<ApiSingleResponse<IMusic>>(baseUrl + `/${id}`);
  }

  async function upMusic(
    id: number,
    data: { music: File }
  ): Promise<ApiSingleResponse<string>> {
    return M_POST<ApiSingleResponse<string>>(
      `${baseUrl}/upload/${id}`,
      convertFormData(data)
    );
  }

  async function updateMusic(
    id: number,
    data: Partial<IAddNewMusic>
  ): Promise<ApiSingleResponse<IMusic>> {
    return PUT<ApiSingleResponse<IMusic>>(
      baseUrl + `/${id}`,
      convertFormData(data)
    );
  }

  return {
    getMusicById,
    getMusicLists,
    createMusic,
    upMusic,
    updateMusic,
    deleteMusics
  };
};

export default useMusicApi;
