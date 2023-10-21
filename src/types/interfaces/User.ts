import { UserRole } from '../enums/UserRole';

export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  email: string;
  address: string;
  phone: string;
  isActive: boolean;
  role: UserRole;
  provider: number;
  accessToken: string;
  refreshToken: string;
}

export const generateDefauleUser = () =>
  ({
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    username: '',
    email: '',
    address: '',
    phone: '',
    isActive: true,
    role: UserRole.ADMIN,
    provider: 1
  } as User);
