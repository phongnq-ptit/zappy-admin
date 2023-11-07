import { TypeItem } from '../enums/TypeItem';

export interface Author {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  image: string;
  type: TypeItem;
}

export interface INewAuthor {
  name: string;
  description: string;
  type: TypeItem;
  image?: File;
}
