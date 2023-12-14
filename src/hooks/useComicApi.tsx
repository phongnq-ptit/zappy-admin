import React from 'react';
import useApi from './useApi';
import { ApiListResponse, QueryParams } from 'src/types/interfaces/Base';
import { IComic } from 'src/types/interfaces/Comic';

const useComicApi = () => {
  const { GET, POST, PUT, DELETE } = useApi();
  const baseUrl = '/comics';

  function getComicLists(
    query?: QueryParams
  ): Promise<ApiListResponse<IComic[]>> {
    return GET<ApiListResponse<IComic[]>>(baseUrl, query);
  }

  return {
    getComicLists
  };
};

export default useComicApi;
