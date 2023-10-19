import { UserRole } from '../enums/UserRole';

export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  id: string;
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
