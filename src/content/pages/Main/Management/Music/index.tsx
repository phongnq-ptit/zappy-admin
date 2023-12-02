import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Pathname } from 'src/routes/path';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import MusicLists from './MusicLists';

const ManageMusic = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Quản lý nhạc | Zappy</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Quản Lý Nhạc
            </Typography>
            <Typography variant="subtitle2">
              Quản lý các bản nhạc trên hệ thống của Zappy.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={() => {
                navigate(`/${Pathname.musics}/add`);
              }}
            >
              Tạo bản nhạc mới
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <MusicLists />
    </>
  );
};

export default ManageMusic;
