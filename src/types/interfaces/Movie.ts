import { MovieState } from '../enums/MovieState';
import { Author } from './Author';
import { Genre } from './Genre';

export interface IMovie {
  id: number;
  title: string;
  publishDate: Date;
  views: number;
  likes: number;
  desc: string;
  minAge: number;
  thumbnail: string;
  duration: number;
  isAccess: boolean;
  authors: Author[];
  genres: Genre[];
  state: MovieState;
  golds: number;
  createdAt?: Date;
  updatedAt?: Date;
  url: string;
  type: number;
}

export interface IAddNewMovie {
  image: File;
  title: string;
  minAge: number;
  publishDate: Date;
  desc: string;
  golds: number;
  authorIds: number[];
  genreIds: number[];
  state: MovieState;
}
