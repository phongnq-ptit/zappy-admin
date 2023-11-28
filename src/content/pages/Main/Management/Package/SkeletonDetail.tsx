import { Box, Grid, Paper, Skeleton } from '@mui/material';
import React, { ReactNode } from 'react';

const SkeletonDetail = () => {
  return (
    <Grid
      container
      spacing={2}
      flexDirection="column"
      sx={{ width: '100%', my: 2 }}
    >
      <Grid item xs={12}>
        <Center>
          <Skeleton height={100} width={600} />
        </Center>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Grid container alignItems="center" justifyContent="center">
                <Grid item>
                  <Skeleton width={250} height={400} variant="rectangular" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Skeleton height={55} variant="rectangular" />
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton height={55} variant="rectangular" />
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton height={55} variant="rectangular" />
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton height={55} variant="rectangular" />
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton height={55} variant="rectangular" />
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton height={55} variant="rectangular" />
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton height={55} variant="rectangular" />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={110} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton
                      variant="rectangular"
                      width={250}
                      height={50}
                      sx={{ float: 'right' }}
                    />
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const Center = (props: { children: ReactNode }) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {props.children}
    </Box>
  );
};

export default SkeletonDetail;
