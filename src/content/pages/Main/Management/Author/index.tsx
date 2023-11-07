import { TabList, TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import { Box, Button, Grid, Tab, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import useAuthorApi from 'src/hooks/useAuthorApi';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import AuthorLists from './AuthorLists';
import AddNewAuthorDialog from './AddNewAuthorDialog';
import { EAuthorTabs, useAuthorStore } from './store';

const ManageAuthors = () => {
  const { getAuthorAll, getAuthorComic, getAuthorMovie, getAuthorMusic } =
    useAuthorApi();
  const { tabs, onChangeTabs, skeletonLoading } = useAuthorStore();
  const [open, setOpen] = useState(false);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    onChangeTabs(newValue as EAuthorTabs);
  };

  return (
    <>
      <Helmet>
        <title>Quản lý tác giả | Zappy</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Quản Lý Tác Giả
            </Typography>
            <Typography variant="subtitle2">
              Quản lý các tác giả của từng mục phim, truyện và nhạc.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={() => setOpen(true)}
            >
              Thêm tác giả mới
            </Button>
            <AddNewAuthorDialog open={open} setOpen={setOpen} />
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
              value={EAuthorTabs.ALL}
            />
            <Tab
              label="Truyện"
              disabled={skeletonLoading}
              value={EAuthorTabs.COMIC}
            />
            <Tab
              label="Nhạc"
              disabled={skeletonLoading}
              value={EAuthorTabs.MUSIC}
            />
            <Tab
              label="Phim"
              disabled={skeletonLoading}
              value={EAuthorTabs.MOVIE}
            />
          </TabList>
        </Box>
        <TabPanel value={EAuthorTabs.ALL}>
          <AuthorLists api={getAuthorAll} />
        </TabPanel>
        <TabPanel value={EAuthorTabs.COMIC}>
          <AuthorLists api={getAuthorComic} />
        </TabPanel>
        <TabPanel value={EAuthorTabs.MUSIC}>
          <AuthorLists api={getAuthorMusic} />
        </TabPanel>
        <TabPanel value={EAuthorTabs.MOVIE}>
          <AuthorLists api={getAuthorMovie} />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default ManageAuthors;
