import { Grid, Paper, Skeleton } from '@mui/material';
import React from 'react';

const SekeletonProfiles = () => {
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12}>
        <Skeleton sx={{ width: '20%', float: 'right', height: 65 }} />
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ height: 280, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Skeleton sx={{ width: '40%' }} />
            </Grid>
            <Grid item xs={3}>
              <Grid
                container
                flexDirection="column"
                alignItems="center"
                sx={{ height: '100%', width: '100%' }}
              >
                <Skeleton sx={{ width: '60%', height: '100%' }} />
              </Grid>
            </Grid>
            <Grid item xs={9} sx={{ pb: 2 }}>
              <Grid container spacing={2}>
                {new Array(4).fill(0).map((value, index) => (
                  <Grid item xs={4} key={'skeleton' + value + index}>
                    <Skeleton />
                    <Skeleton />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Skeleton sx={{ width: '20%', float: 'right', height: 70 }} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SekeletonProfiles;
