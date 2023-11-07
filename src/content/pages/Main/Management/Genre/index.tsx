import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Grid, Tab, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import GenreLists from 'src/content/pages/Main/Management/Genre/GenreLists';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import useGenreApi from 'src/hooks/useGenreApi';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import AddNewGenreDialog from './AddNewGenreDialog';
import { EGenreTabs, useGenreStore } from './store';

const ManageGenres = () => {
  const { getGenreAll, getGenreComic, getGenreMovie, getGenreMusic } =
    useGenreApi();
  const [open, setOpen] = useState(false);
  const { tabs, onChangeTabs, skeletonLoading } = useGenreStore();

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    onChangeTabs(newValue as EGenreTabs);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Quản lý thể loại | Zappy</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Quản Lý Thể Loại
            </Typography>
            <Typography variant="subtitle2">
              Quản lý các thể loại của từng mục phim, truyện và nhạc.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={() => setOpen(true)}
            >
              Tạo thể loại mới
            </Button>
            <AddNewGenreDialog open={open} setOpen={setOpen} />
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <TabContext value={tabs}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 1 }}>
          <TabList
            onChange={handleChangeTabs}
            aria-label="lab API tabs example"
          >
            <Tab
              label="Tất cả"
              disabled={skeletonLoading}
              value={EGenreTabs.ALL}
            />
            <Tab
              label="Truyện"
              disabled={skeletonLoading}
              value={EGenreTabs.COMIC}
            />
            <Tab
              label="Nhạc"
              disabled={skeletonLoading}
              value={EGenreTabs.MUSIC}
            />
            <Tab
              label="Phim"
              disabled={skeletonLoading}
              value={EGenreTabs.MOVIE}
            />
          </TabList>
        </Box>
        <TabPanel value={EGenreTabs.ALL}>
          <GenreLists api={getGenreAll} />
        </TabPanel>
        <TabPanel value={EGenreTabs.COMIC}>
          <GenreLists api={getGenreComic} />
        </TabPanel>
        <TabPanel value={EGenreTabs.MUSIC}>
          <GenreLists api={getGenreMusic} />
        </TabPanel>
        <TabPanel value={EGenreTabs.MOVIE}>
          <GenreLists api={getGenreMovie} />
        </TabPanel>
      </TabContext>
    </React.Fragment>
  );
};

export default ManageGenres;
