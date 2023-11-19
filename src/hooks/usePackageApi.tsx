import React from 'react';
import useApi from './useApi';
import {
  ApiListResponse,
  ApiSingleResponse,
  QueryParams
} from 'src/types/interfaces/Base';
import { IPackage } from 'src/types/interfaces/Package';

const usePackageApi = () => {
  const { GET, POST, PUT, DELETE } = useApi();
  const baseUrl = '/package';

  function getPackageLists(
    query?: QueryParams
  ): Promise<ApiListResponse<IPackage[]>> {
    return GET<ApiListResponse<IPackage[]>>(baseUrl, query);
  }

  async function deletePackages(
    ids: number[]
  ): Promise<ApiSingleResponse<IPackage>> {
    return DELETE<ApiSingleResponse<IPackage>>(baseUrl, { data: { ids } });
  }

  return {
    getPackageLists,
    deletePackages
  };
};

export default usePackageApi;
