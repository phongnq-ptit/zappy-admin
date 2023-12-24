import { MovieState } from '../enums/MovieState';
import { Author } from './Author';
import { Genre } from './Genre';

export interface IComic {
  id: number;
  title: string;
  minAge: number;
  desc: string;
  thumbnail: string;
  views: number;
  golds: number;
  authors: Author[];
  genres: Genre[];
  chaptersCount: number;
  isAccess: boolean;
  isLike: boolean;
  isPlaylist: boolean;
  publishDate: Date;
  state: MovieState;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAddNewComic {
  thumbnail: File;
  title: string;
  minAge: number;
  publishDate: Date;
  desc: string;
  golds: number;
  authorIds: number[];
  genreIds: number[];
  state: MovieState;
}

export interface IChapter {
  id: number;
}
