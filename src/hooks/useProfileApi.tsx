import React from 'react';
import useApi from './useApi';
import { ApiSingleResponse } from 'src/types/interfaces/Base';
import {
  ICreateProfile,
  IUpdateProfile,
  Profile
} from 'src/types/interfaces/User';
import { convertFormData } from 'src/utils/Helper';

const useProfileApi = () => {
  const { GET, POST, PATCH, DELETE } = useApi();
  const baseUrl = '/profile';

  async function getProfileListsByUserId(
    id: number
  ): Promise<ApiSingleResponse<Profile[]>> {
    return GET<ApiSingleResponse<Profile[]>>(baseUrl + `/user/${id}`);
  }

  async function updateProfile(
    id: number,
    data: Partial<IUpdateProfile>
  ): Promise<ApiSingleResponse<Profile>> {
    return PATCH<ApiSingleResponse<Profile>>(
      baseUrl + `/${id}`,
      convertFormData(data)
    );
  }

  async function deleteProfile(
    ids: number[]
  ): Promise<ApiSingleResponse<Profile>> {
    return DELETE<ApiSingleResponse<Profile>>(baseUrl, { data: { ids } });
  }

  async function createProfile(
    data: ICreateProfile
  ): Promise<ApiSingleResponse<Profile>> {
    return POST<ApiSingleResponse<Profile>>(
      baseUrl + '/admin',
      convertFormData(data)
    );
  }

  return {
    getProfileListsByUserId,
    updateProfile,
    deleteProfile,
    createProfile
  };
};

export default useProfileApi;
