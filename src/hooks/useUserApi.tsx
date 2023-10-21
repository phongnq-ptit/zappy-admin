import React from 'react';
import useApi from './useApi';
import { User, UserLogin } from '../types/interfaces/User';
import { ApiSingleResponse } from '../types/interfaces/Base';

const useUserApi = () => {
  const { GET, POST } = useApi();
  const baseUrl = '/user';

  async function login(user: UserLogin): Promise<ApiSingleResponse<User>> {
    return POST<ApiSingleResponse<User>>(baseUrl + '/login', user);
  }

  async function getMe(): Promise<ApiSingleResponse<User>> {
    return GET<ApiSingleResponse<User>>(baseUrl + '/me');
  }

  return {
    login,
    getMe
  };
};

export default useUserApi;
