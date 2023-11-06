import { Skeleton, TableCell, TableRow } from '@mui/material';
import _ from 'lodash';
import React from 'react';

const SkeletonAuthors = () => {
  return (
    <React.Fragment>
      {_.range(6, 0).map((value, index) => (
        <TableRow hover key={index + 'sekeleton'}>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton sx={{ width: '70%' }} />
          </TableCell>
          <TableCell align="center">
            <Skeleton />
          </TableCell>
          <TableCell align="right">
            <Skeleton />
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

export default SkeletonAuthors;
