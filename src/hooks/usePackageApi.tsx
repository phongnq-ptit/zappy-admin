import React from 'react';
import useApi from './useApi';
import {
  ApiListResponse,
  ApiSingleResponse,
  QueryParams
} from 'src/types/interfaces/Base';
import {
  IAddNewPackage,
  IPackage,
  IUpdatePackage
} from 'src/types/interfaces/Package';
import { convertFormData } from 'src/utils/Helper';

const usePackageApi = () => {
  const { GET, POST, PUT, DELETE } = useApi();
  const baseUrl = '/package';

  function getPackageLists(
    query?: QueryParams
  ): Promise<ApiListResponse<IPackage[]>> {
    return GET<ApiListResponse<IPackage[]>>(baseUrl, query);
  }

  function getPackageById(id: number): Promise<ApiSingleResponse<IPackage>> {
    return GET<ApiSingleResponse<IPackage>>(baseUrl + `/${id}`);
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

  async function updatePackage(
    id: number,
    data: IUpdatePackage
  ): Promise<ApiSingleResponse<IPackage>> {
    return PUT<ApiSingleResponse<IPackage>>(
      baseUrl + `/${id}`,
      convertFormData(data)
    );
  }

  return {
    getPackageLists,
    deletePackages,
    createPackage,
    getPackageById,
    updatePackage
  };
};

export default usePackageApi;
