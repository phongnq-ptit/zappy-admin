import React from 'react';
import useApi from './useApi';
import { ApiListResponse, ApiSingleResponse } from 'src/types/interfaces/Base';
import { IUpdateProfile, Profile } from 'src/types/interfaces/User';
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

  return {
    getProfileListsByUserId,
    updateProfile,
    deleteProfile
  };
};

export default useProfileApi;
