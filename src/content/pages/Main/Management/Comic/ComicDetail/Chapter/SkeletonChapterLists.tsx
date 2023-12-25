import { Grid, Skeleton, TableCell, TableRow } from '@mui/material';
import _ from 'lodash';
import React, { ReactNode } from 'react';

const SkeletonChapterLists = () => {
  return (
    <React.Fragment>
      {_.range(6, 0).map((value, index) => (
        <TableRow hover key={'skeleton' + index}>
          <TableCell align="center">
            <Centered>
              <Skeleton variant="rectangular" width={20} height={20} />
            </Centered>
          </TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell align="center">
            <Skeleton />
          </TableCell>
          <TableCell align="center">
            <Skeleton />
          </TableCell>
          <TableCell>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Skeleton variant="rectangular" width={20} height={20} />
              </Grid>
              <Grid item xs={6}>
                <Skeleton variant="rectangular" width={20} height={20} />
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
      ))}
    </React.Fragment>
  );
};

const Centered = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      container
      alignItems="center"
      flexDirection="column"
      sx={{ width: '100%', height: '100%' }}
    >
      <Grid item>{children}</Grid>
    </Grid>
  );
};

export default SkeletonChapterLists;
