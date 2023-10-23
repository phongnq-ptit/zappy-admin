import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AllGenres from 'src/components/Main/ManageGenres/AllGenres';

enum Tabs {
  ALL = 'all',
  COMIC = 'comic',
  MUSIC = 'music',
  MOVIE = 'movie'
}

const ManageGenres = () => {
  const [tabs, setTabs] = useState<string>(Tabs.ALL);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    setTabs(newValue);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Quản lý thể loại | Zappy</title>
      </Helmet>
      <TabContext value={tabs}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 1 }}>
          <TabList
            onChange={handleChangeTabs}
            aria-label="lab API tabs example"
          >
            <Tab label="Tất cả" value={Tabs.ALL} />
            <Tab label="Truyện" value={Tabs.COMIC} />
            <Tab label="Nhạc" value={Tabs.MUSIC} />
            <Tab label="Phim" value={Tabs.MOVIE} />
          </TabList>
        </Box>
        <TabPanel value={Tabs.ALL}>
          <AllGenres />
        </TabPanel>
        <TabPanel value={Tabs.COMIC}>Item comic</TabPanel>
        <TabPanel value={Tabs.MUSIC}>Item music</TabPanel>
        <TabPanel value={Tabs.MOVIE}>Item movie</TabPanel>
      </TabContext>
    </React.Fragment>
  );
};

export default ManageGenres;
