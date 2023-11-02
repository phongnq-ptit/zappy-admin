import React from 'react';
import _ from 'lodash';
import { Skeleton, TableCell, TableRow } from '@mui/material';

const SkeletonAccountLists = () => {
  return (
    <React.Fragment>
      {_.range(7, 0).map((value, index) => (
        <TableRow key={'skeleton-account-' + index + value}>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton />
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton sx={{ width: '60%' }} />
          </TableCell>
          <TableCell>
            <Skeleton sx={{ width: '60%' }} />
          </TableCell>
          <TableCell align="right">
            <Skeleton sx={{ width: '70%', float: 'right' }} />
            <Skeleton sx={{ width: '70%', float: 'right' }} />
          </TableCell>
          <TableCell align="center">
            <Skeleton sx={{ width: '50%', margin: '0 auto' }} />
          </TableCell>
        </TableRow>
      ))}
    </React.Fragment>
  );
};

export default SkeletonAccountLists;
