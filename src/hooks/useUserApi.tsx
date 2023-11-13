import React from 'react';
import useApi from './useApi';
import { IUpdateUser, User, UserLogin } from '../types/interfaces/User';
import {
  ApiListResponse,
  ApiSingleResponse,
  QueryParams
} from '../types/interfaces/Base';

const useUserApi = () => {
  const { GET, POST, PATCH } = useApi();
  const baseUrl = '/user';

  async function login(user: UserLogin): Promise<ApiSingleResponse<User>> {
    return POST<ApiSingleResponse<User>>(baseUrl + '/login', user);
  }

  async function getMe(): Promise<ApiSingleResponse<User>> {
    return GET<ApiSingleResponse<User>>(baseUrl + '/me');
  }

  async function getAllUser(
    query: QueryParams
  ): Promise<ApiListResponse<User[]>> {
    return GET<ApiListResponse<User[]>>(baseUrl, query);
  }

  async function getUserById(id: number): Promise<ApiSingleResponse<User>> {
    return GET<ApiSingleResponse<User>>(baseUrl + `/${id}`);
  }

  async function updateUser(
    id: number,
    data: IUpdateUser
  ): Promise<ApiSingleResponse<User>> {
    return PATCH<ApiSingleResponse<User>>(baseUrl + `/${id}`, data);
  }

  return {
    login,
    getMe,
    getAllUser,
    getUserById,
    updateUser
  };
};

export default useUserApi;
