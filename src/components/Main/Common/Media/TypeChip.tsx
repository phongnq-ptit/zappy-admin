import React from 'react';
import Label from 'src/components/Label';
import { TypeItem } from 'src/types/enums/TypeItem';

const TypeChip = ({ type }: { type: TypeItem }) => {
  const map = {
    [TypeItem.Comics]: {
      text: 'Truyện',
      color: 'error'
    },
    [TypeItem.Movies]: {
      text: 'Phim',
      color: 'success'
    },
    [TypeItem.Music]: {
      text: 'Nhạc',
      color: 'warning'
    }
  };

  const { text, color }: any = map[type];

  return <Label color={color}>{text}</Label>;
};

export default TypeChip;
