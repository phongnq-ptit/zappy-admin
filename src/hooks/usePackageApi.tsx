import React from 'react';
import useApi from './useApi';
import {
  ApiListResponse,
  ApiSingleResponse,
  QueryParams
} from 'src/types/interfaces/Base';
import { IAddNewPackage, IPackage } from 'src/types/interfaces/Package';
import { convertFormData } from 'src/utils/Helper';

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

  async function createPackage(
    data: IAddNewPackage
  ): Promise<ApiSingleResponse<IPackage>> {
    return POST<ApiSingleResponse<IPackage>>(baseUrl, convertFormData(data));
  }

  return {
    getPackageLists,
    deletePackages,
    createPackage
  };
};

export default usePackageApi;
