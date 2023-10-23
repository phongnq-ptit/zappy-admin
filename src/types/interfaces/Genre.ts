import { TypeItem } from '../enums/TypeItem';

export interface Genre {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  type: TypeItem;
}
