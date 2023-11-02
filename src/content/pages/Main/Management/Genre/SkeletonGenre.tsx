import React from 'react';
import _ from 'lodash';
import { Skeleton, TableCell, TableRow } from '@mui/material';

const SkeletonGenre = () => {
  return (
    <React.Fragment>
      {_.range(7, 0).map((value, index) => (
        <TableRow hover key={index + 'sekeleton'}>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton sx={{ width: '70%' }} />
          </TableCell>
          <TableCell align="right">
            <Skeleton />
          </TableCell>
          <TableCell align="right">
            <Skeleton />
          </TableCell>
          <TableCell align="right">
            <Skeleton />
          </TableCell>
          <TableCell align="right">
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </React.Fragment>
  );
};

export default SkeletonGenre;
