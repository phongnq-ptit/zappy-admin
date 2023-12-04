import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Pathname } from 'src/routes/path';
import ComicLists from './ComicLists';

const ManageComic = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Quản lý truyện | Zappy</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Quản Lý Truyện
            </Typography>
            <Typography variant="subtitle2">
              Quản lý các bộ truyện trên hệ thống của Zappy.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={() => {
                navigate(`/${Pathname.comics}/add`);
              }}
            >
              Tạo bộ truyện mới
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <ComicLists />
    </>
  );
};

export default ManageComic;
