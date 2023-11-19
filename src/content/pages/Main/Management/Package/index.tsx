import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Pathname } from 'src/routes/path';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PackageLists from './PackageLists';

const index = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Quản lý gói ưu đãi | Zappy</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Quản Lý Gói Ưu Đãi
            </Typography>
            <Typography variant="subtitle2">
              Quản lý các gói nạp vàng của hệ thống.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={() => {
                navigate(`/${Pathname.package}/add`);
              }}
            >
              Tạo gói ưu đãi mới
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <PackageLists />
    </>
  );
};

export default index;
