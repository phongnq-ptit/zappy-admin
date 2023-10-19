import React from 'react';
import useApi from './useApi';
import { User, UserLogin } from '../types/interfaces/User';
import { ApiSingleResponse } from '../types/interfaces/Base';

const useUserApi = () => {
  const { POST } = useApi();
  const baseUrl = '/user';

  async function login(user: UserLogin): Promise<ApiSingleResponse<User>> {
    return POST<ApiSingleResponse<User>>(baseUrl + '/login', user);
  }

  return {
    login
  };
};

export default useUserApi;
