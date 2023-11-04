import axios, { AxiosInstance } from 'axios';
import { useContext } from 'react';
import { GlobalContext } from 'src/contexts/GlobalContext';

interface IToken {
  accessToken: string;
  refreshToken: string;
}

export default function useApi() {
  const login = localStorage.getItem('login');
  const token: IToken = login
    ? JSON.parse(login)
    : { accessToken: '', refreshToken: '' };
  const { setGError } = useContext(GlobalContext);

  async function AXIOS(): Promise<AxiosInstance> {
    let instance: AxiosInstance;

    const config = getConfig();
    instance = axios.create(config);
    instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        setGError({ isError: true, message: error.response.data.message });
        return Promise.reject(error);
      }
    );
    /* @ts-ignore */
    return instance;
  }

  async function GET<T>(url: string, params?: any): Promise<T> {
    const api = await AXIOS();
    return api.get(url, { params: params });
  }

  async function POST<T>(url: string, body: any, params?: any): Promise<T> {
    const api = await AXIOS();
    return api.post(url, body, { params: params });
  }

  async function PUT<T>(url: string, body: any, params?: any): Promise<T> {
    const api = await AXIOS();
    return api.put(url, body, { params: params });
  }

  async function PATCH<T>(url: string, body: any, params?: any): Promise<T> {
    const api = await AXIOS();
    return api.patch(url, body, { params: params });
  }

  async function DELETE<T>(url: string, params?: any): Promise<T> {
    const api = await AXIOS();
    return api.delete(url, { params: params });
  }

  const getConfig = () => {
    return {
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        ContentType: 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token.accessToken}`
      }
    };
  };

  return { GET, POST, PUT, PATCH, DELETE };
}
