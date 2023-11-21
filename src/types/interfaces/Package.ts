import { PackageState } from '../enums/PackageState';

export interface IPackage {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  price: number;
  golds: number;
  discount: number;
  state: PackageState;
  image: string;
  startDate: Date;
  endDate: Date;
  desc: string;
}

export interface IAddNewPackage {
  name: string;
  price: number;
  golds: number;
  discount: number;
  state: PackageState;
  image: File;
  startDate: Date;
  endDate: Date;
  desc: string;
}
