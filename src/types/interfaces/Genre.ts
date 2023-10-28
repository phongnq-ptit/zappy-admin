import { TypeItem } from '../enums/TypeItem';

export interface Genre {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  type: TypeItem;
}

export interface INewGenre {
  name: string;
  type: TypeItem;
}
