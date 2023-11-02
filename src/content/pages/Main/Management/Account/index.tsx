import { Button, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import AccountLists from './AccountLists';

const ManageAccount = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý người dùng | Zappy</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Quản Lý Người Dùng
            </Typography>
            <Typography variant="subtitle2">
              Quản lý các tài khoản của khách hàng và hồ sơ của họ.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Tạo tài khoản mới
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <AccountLists />
    </>
  );
};

export default ManageAccount;
