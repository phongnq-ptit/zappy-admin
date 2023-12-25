import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useComicApi from 'src/hooks/useComicApi';
import { useComicStore } from '../store';
import { Box, Grid, Link, Paper, Tab, Typography } from '@mui/material';
import Status404 from 'src/content/pages/Status/Status404';
import { Pathname } from 'src/routes/path';
import { Helmet } from 'react-helmet-async';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ChapterLists from './Chapter';
import { makeStyles } from '@mui/styles';
import { formatDate } from 'src/utils/Helper';
import { format } from 'date-fns';
import { IComic } from 'src/types/interfaces/Comic';
import Label from 'src/components/Label';
import Edit from './Edit';
import SkeletonChapterDetail from './SkeletonChapterDetail';

const useStyles = makeStyles({
  titleColor: {
    color: 'rgba(0,0,0,0.5)',
    textTransform: 'capitalize',
    marginBottom: '4px !important'
  },
  fontS1: {
    fontSize: '1rem'
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline !important'
  }
});

const EditComic = () => {
  const classes = useStyles();
  const params = useParams();
  const { getComicById } = useComicApi();
  const { tabs, onChangeTabs, comic, onChangeComic, reload } = useComicStore();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    onChangeTabs(newValue as string);
  };

  useEffect(() => {
    if (params.comicId) {
      setLoading(true);
      getComicById(Number(params.comicId))
        .then((response) => {
          onChangeComic(response.data);
        })
        .catch((e) => {
          if (e.response.data.errorCode === 'comic_not_found')
            setNotFound(true);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 750);
        });
    }
  }, [params.comicId, reload]);

  const getLabelState = (comic: IComic) => {
    const { state } = comic;
    switch (state) {
      case 1:
        return {
          color: 'success',
          text: 'Đang hoạt động'
        };
      case 0:
        return {
          color: 'warning',
          text: 'Chưa công khai'
        };
      default:
        return {
          color: 'black',
          text: 'Không hoạt động'
        };
    }
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
          <Status404 url={`/${Pathname.comics}`} />
        </Box>
      ) : (
        <>
          {loading ? (
            <SkeletonChapterDetail />
          ) : (
            <>
              <Helmet>
                <title>{`${comic.title.toUpperCase()} | Zappy`}</title>
              </Helmet>
              <Grid
                container
                spacing={2}
                flexDirection="column"
                sx={{ width: '100%', my: 2 }}
              >
                <Grid item xs={12}>
                  <Typography variant="h2" gutterBottom textAlign="center">
                    {`Truyện: ${comic.title}`.toUpperCase()}&nbsp;
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
                        <Tab label="Tổng Quan" value={'summary'} />
                        <Tab label="Chỉnh Sửa thông tin" value={'edit'} />
                        <Tab label="Quản Lý Tập" value={'chapters'} />
                      </TabList>
                    </Box>
                    <TabPanel value={'summary'}>
                      <Paper elevation={0} sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Grid
                              container
                              justifyContent="center"
                              alignItems="center"
                              sx={{ width: '100%', height: '100%' }}
                            >
                              <Grid item>
                                <Box
                                  component="img"
                                  src={comic.thumbnail}
                                  sx={{
                                    width: '260px',
                                    height: '300px',
                                    objectFit: 'cover'
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={8}>
                            <Grid container spacing={2} px={1} pt={2}>
                              <Grid item xs={4}>
                                <Typography
                                  variant="h5"
                                  className={classes.titleColor}
                                >
                                  Tên truyện:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.fontS1}
                                >
                                  {comic.title}
                                </Typography>
                              </Grid>
                              <Grid item xs={4} p={1}>
                                <Typography
                                  variant="h5"
                                  className={classes.titleColor}
                                >
                                  Ngày phát hành:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.fontS1}
                                >
                                  {formatDate(new Date(comic.publishDate))}
                                </Typography>
                              </Grid>
                              <Grid item xs={4} p={1}>
                                <Typography
                                  variant="h5"
                                  className={classes.titleColor}
                                >
                                  Giới hạn độ tuổi:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.fontS1}
                                >
                                  {comic.minAge + ' tuổi'}
                                </Typography>
                              </Grid>
                              <Grid item xs={4} p={1}>
                                <Typography
                                  variant="h5"
                                  className={classes.titleColor}
                                >
                                  Số vàng:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.fontS1}
                                >
                                  {comic.golds + ' vàng'}
                                </Typography>
                              </Grid>
                              <Grid item xs={4} p={1}>
                                <Typography
                                  variant="h5"
                                  className={classes.titleColor}
                                >
                                  Ngày tạo:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.fontS1}
                                >
                                  {format(
                                    new Date(comic.createdAt),
                                    'HH:mm, dd/MM/yyy'
                                  )}
                                </Typography>
                              </Grid>
                              <Grid item xs={4} p={1}>
                                <Typography
                                  variant="h5"
                                  className={classes.titleColor}
                                >
                                  Ngày cập nhật:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.fontS1}
                                >
                                  {format(
                                    new Date(comic.createdAt),
                                    'HH:mm, dd/MM/yyy'
                                  )}
                                </Typography>
                              </Grid>
                              <Grid item xs={4} p={1}>
                                <Typography
                                  variant="h5"
                                  className={classes.titleColor}
                                >
                                  Trạng thái:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.fontS1}
                                >
                                  <Label
                                    color={getLabelState(comic).color as any}
                                  >
                                    {getLabelState(comic).text}
                                  </Label>
                                </Typography>
                              </Grid>
                              <Grid item xs={12} p={1}>
                                <Typography
                                  variant="h5"
                                  className={classes.titleColor}
                                >
                                  Thể loại:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.fontS1}
                                >
                                  {comic.genres
                                    .map((item) => item.name)
                                    .join(' ,')}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  variant="h5"
                                  className={classes.titleColor}
                                >
                                  Tác giả:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.fontS1}
                                >
                                  {comic.authors
                                    .map((item) => item.name)
                                    .join(' ,')}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  variant="h5"
                                  className={classes.titleColor}
                                >
                                  Mô tả:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.fontS1}
                                >
                                  {comic.desc}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Link
                                  onClick={() => onChangeTabs('edit')}
                                  className={classes.link}
                                >
                                  Chỉnh sửa thông tin tài khoản
                                </Link>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </TabPanel>
                    <TabPanel value={'edit'}>
                      <Edit />
                    </TabPanel>
                    <TabPanel value={'chapters'}>
                      <ChapterLists />
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

export default EditComic;
