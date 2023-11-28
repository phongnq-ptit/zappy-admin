import axios, { AxiosInstance } from 'axios';
import { useContext } from 'react';
import { GlobalContext } from 'src/contexts/GlobalContext';

interface IToken {
  accessToken: string;
  refreshToken: string;
}

const IGNORE_ERRORS = [
  'user_not_found',
  'package_not_found',
  'media_not_found'
];

export default function useMediaApi() {
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
        if (!response.data?.success) {
          if (!IGNORE_ERRORS.includes(response.data?.errorCode))
            setGError({ isError: true, message: response.data?.message });
        }
        return response.data;
      },
      (error) => {
        console.log(error);

        if (!IGNORE_ERRORS.includes(error.response.data.errorCode))
          setGError({ isError: true, message: error.response.data.message });
        return Promise.reject(error);
      }
    );
    /* @ts-ignore */
    return instance;
  }

  async function M_GET<T>(url: string, params?: any): Promise<T> {
    const api = await AXIOS();
    return api.get(url, { params: params });
  }

  async function M_POST<T>(url: string, body: any, params?: any): Promise<T> {
    const api = await AXIOS();
    return api.post(url, body, { params: params });
  }

  const getConfig = () => {
    return {
      baseURL: process.env.REACT_APP_API_MEDIA_SERVICE,
      headers: {
        ContentType: 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token.accessToken}`
      }
    };
  };

  return { M_GET, M_POST };
}
