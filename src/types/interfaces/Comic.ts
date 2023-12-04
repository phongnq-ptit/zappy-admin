import { Author } from './Author';
import { Genre } from './Genre';

export interface IComic {
  id: string;
  title: string;
  minAge: number;
  desc: string;
  thumbnail: string;
  views: string;
  isAccess: boolean;
  price: number;
  author: Author[];
  genres: Genre[];
  chaptersCount: number;
}
