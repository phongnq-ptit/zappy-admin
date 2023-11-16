import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Skeleton, Tab, Typography, useTheme } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAccountStore } from '../store';
import { useParams } from 'react-router';
import useUserApi from 'src/hooks/useUserApi';
import { EAccountTabs, useAccountDetail } from './store';
import Status404 from 'src/content/pages/Status/Status404';
import { Pathname } from 'src/routes/path';
import SkeletonAccDetail from './SkeletonAccDetail';
import Summary from './Summary';
import EditAccount from './EditAccount';
import ManageProfile from './Profile/ManageProfile';

const AccountDetail = () => {
  const params = useParams();
  const { getUserById } = useUserApi();
  const { tabs, onChangeTabs } = useAccountDetail();
  const { account, onChangeAccount } = useAccountStore();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (params.userId) {
      setLoading(true);
      getUserById(Number(params.userId))
        .then((response) => {
          onChangeAccount(response.data);
          onChangeTabs(EAccountTabs.SUMMARY);
        })
        .catch((e) => {
          if (e.response.data.errorCode === 'user_not_found') setNotFound(true);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 750);
        });
    }
  }, [params.userId]);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    onChangeTabs(newValue as EAccountTabs);
  };

  return (
    <React.Fragment>
      {notFound ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ width: '100%', height: '88vh' }}
        >
          <Status404 url={`/${Pathname.users}`} />
        </Box>
      ) : (
        <>
          {loading ? (
            <SkeletonAccDetail />
          ) : (
            <>
              <Helmet>
                <title>{`${account.username.toUpperCase()} | Zappy`}</title>
              </Helmet>
              <Grid
                container
                spacing={2}
                flexDirection="column"
                sx={{ width: '100%', my: 2 }}
              >
                <Grid item xs={12}>
                  <Typography variant="h2" gutterBottom textAlign="center">
                    {`Tài khoản: ${account.username}`.toUpperCase()}&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TabContext value={tabs}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        p: 1
                      }}
                    >
                      <TabList
                        onChange={handleChangeTabs}
                        aria-label="lab API tabs example"
                        sx={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}
                      >
                        <Tab label="Tổng Quan" value={EAccountTabs.SUMMARY} />
                        <Tab
                          label="Chỉnh Sửa Thông Tin"
                          value={EAccountTabs.EDIT}
                        />
                        <Tab
                          label="Quản Lý Hồ Sơ"
                          value={EAccountTabs.MANAGE_PROFILE}
                        />
                      </TabList>
                    </Box>
                    <TabPanel value={EAccountTabs.SUMMARY}>
                      <Summary />
                    </TabPanel>
                    <TabPanel value={EAccountTabs.EDIT}>
                      <EditAccount />
                    </TabPanel>
                    <TabPanel value={EAccountTabs.MANAGE_PROFILE}>
                      <ManageProfile />
                    </TabPanel>
                  </TabContext>
                </Grid>
              </Grid>
            </>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default AccountDetail;
