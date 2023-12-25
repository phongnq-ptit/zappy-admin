import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Divider, Grid, Skeleton, Tab } from '@mui/material';
import React, { useState } from 'react';

const SkeletonChapterDetail = () => {
  return (
    <Grid
      container
      spacing={2}
      flexDirection="column"
      sx={{ width: '100%', my: 2 }}
    >
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <Skeleton variant="rectangular" sx={{ p: 2, width: '50%' }} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} mt={1} mb={2}>
          <Grid item xs={2}>
            <Skeleton />
          </Grid>
          <Grid item xs={2}>
            <Skeleton />
          </Grid>
          <Grid item xs={2}>
            <Skeleton />
          </Grid>
        </Grid>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rectangular" sx={{ padding: 16, mx: 2, mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default SkeletonChapterDetail;
