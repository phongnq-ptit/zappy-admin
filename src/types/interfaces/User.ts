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
  golds: number;
  isActive: boolean;
  role: UserRole;
  provider: number;
  profiles?: Profile[];
  profilesCount?: number;
  accessToken?: string;
  refreshToken?: string;
}

export interface Profile {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  nickname: string;
  birthday: string;
  avatar: string;
  role: UserRole;
  progress: number;
  isLocked: boolean;
}

export interface IUpdateProfile {
  nickname: string;
  birthday: Date;
  avatar: File;
  isLocked: boolean;
}

export interface ICreateProfile {
  nickname: string;
  birthday: string;
  avatar?: File;
  isLocked: boolean;
  userId: number;
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

export type IUpdateUser = Pick<
  User,
  'username' | 'address' | 'isActive' | 'phone'
>;

export interface IAddNewUser {
  email: string;
  password: string;
  username: string;
  phone: string;
  address: string;
  isActive: boolean;
}
