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
import { MediaTabs } from 'src/types/enums/MediaTabs';

const ManageAuthors = () => {
  const { getAuthorAll, getAuthorComic, getAuthorMovie, getAuthorMusic } =
    useAuthorApi();
  const [tabs, setTabs] = useState<MediaTabs>(MediaTabs.ALL);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    setTabs(newValue as MediaTabs);
  };

  useEffect(() => {
    setTabs(MediaTabs.ALL);
  }, [reload]);

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
            <AddNewAuthorDialog
              reload={reload}
              setReload={setReload}
              open={open}
              setOpen={setOpen}
            />
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <TabContext value={tabs}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 1 }}>
          <TabList
            onChange={handleChangeTabs}
            aria-label="lab API tabs example"
          >
            <Tab label="Tất cả" value={MediaTabs.ALL} />
            <Tab label="Truyện" value={MediaTabs.COMIC} />
            <Tab label="Nhạc" value={MediaTabs.MUSIC} />
            <Tab label="Phim" value={MediaTabs.MOVIE} />
          </TabList>
        </Box>
        <TabPanel value={MediaTabs.ALL}>
          <AuthorLists reload={reload} api={getAuthorAll} />
        </TabPanel>
        <TabPanel value={MediaTabs.COMIC}>
          <AuthorLists reload={reload} api={getAuthorComic} />
        </TabPanel>
        <TabPanel value={MediaTabs.MUSIC}>
          <AuthorLists reload={reload} api={getAuthorMusic} />
        </TabPanel>
        <TabPanel value={MediaTabs.MOVIE}>
          <AuthorLists reload={reload} api={getAuthorMovie} />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default ManageAuthors;
