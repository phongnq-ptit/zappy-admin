import { DatePicker, LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  TextFieldProps,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import UploadImage from 'src/components/UploadFile/UploadImage';
import useMovieApi from 'src/hooks/useMovieApi';
import { Pathname } from 'src/routes/path';
import { IAddNewMovie, IMovie } from 'src/types/interfaces/Movie';
import { SuccessSnackbar, WarningSnackbar } from 'src/utils/ShowSnackbar';
import { useMovieStore } from './store';
import useGenreApi from 'src/hooks/useGenreApi';
import useAuthorApi from 'src/hooks/useAuthorApi';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Author } from 'src/types/interfaces/Author';
import { Genre } from 'src/types/interfaces/Genre';
import FileUpload from 'react-material-file-upload';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import Status404 from 'src/content/pages/Status/Status404';
import SkeletonDetail from './SkeletonDetail';

const EditMovie = () => {
  const { handleSubmit, control, reset, watch, setValue } = useForm();
  const naviagate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [fileUp, setFileUp] = useState<File>();
  const [isChangeFile, setIsChangeFile] = useState<boolean>(false);
  const { updateMovie, getMovieById, upVideo } = useMovieApi();
  const { getGenreMovie } = useGenreApi();
  const { getAuthorMovie } = useAuthorApi();
  const { authors, getMovieAuthors, genres, getMovieGenres } = useMovieStore();
  const [genreIds, setGenreIds] = useState<number[]>([]);
  const [authorIds, setAuthorIds] = useState<number[]>([]);
  const [video, setVideo] = useState<File[]>([]);
  const [isChangeVideo, setIsChangeVideo] = useState<boolean>(false);
  const [loadingPg, setLoadingPg] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isProcess, setIsProcess] = useState<boolean>(false);
  const [movie, setMovie] = useState<IMovie>({
    id: 99999,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: '',
    publishDate: new Date(),
    views: 0,
    likes: 0,
    desc: '',
    minAge: 0,
    thumbnail: '',
    url: '',
    duration: null,
    golds: 0,
    type: 2,
    state: 0,
    authors: [],
    genres: [],
    isAccess: false
  });

  const save = (data: Partial<IAddNewMovie>) => {
    if (isChangeFile && !fileUp) {
      WarningSnackbar('Thay đổi ảnh cần phải tải ảnh lên!');
      return;
    }
    if (isChangeVideo && !video.length) {
      WarningSnackbar('Thay đổi video cần phải tải video lên!');
      return;
    }
    if (isChangeFile && fileUp) data.image = fileUp;
    data.authorIds = authorIds;
    data.genreIds = genreIds;
    setLoading(true);
    updateMovie(movie.id, data)
      .then((response) => {
        if (response.success) {
          setMovie(response.data);
          if (isChangeVideo && video.length) {
            setIsProcess(true);
            upVideo(movie.id, { movie: video[0] }).finally(() => {
              SuccessSnackbar('Cập nhật thông tin phim thành công!');
              naviagate('/' + Pathname.movies);
              setIsProcess(false);
            });
          } else {
            SuccessSnackbar('Cập nhật thông tin phim thành công!');
          }
        }
      })
      .finally(() => {
        resetForm();
        setLoading(false);
      });
  };

  useEffect(() => {
    if (params.movieId) {
      reset();
      resetForm();
      setLoadingPg(true);
      Promise.all([
        getMovieAuthors(getAuthorMovie),
        getMovieGenres(getGenreMovie),
        getMovieById(Number(params.movieId)).then((response) => {
          if (response.data) {
            setMovie(response.data);
          } else {
            setNotFound(response.errorCode === 'media_not_found');
          }
        })
      ]).finally(() => {
        setLoadingPg(false);
      });
    }
  }, [params.movieId]);

  const resetForm = () => {
    setFileUp(null);
    setIsChangeFile(false);
    setIsChangeVideo(false);
    setIsProcess(false);
    setLoading(false);
    setVideo([]);
    setGenreIds([]);
    setAuthorIds([]);
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setFileUp(undefined);
    }
    setIsChangeFile(event.target.checked);
  };

  const handleChangeVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setVideo([]);
    }
    setIsChangeVideo(event.target.checked);
  };

  return (
    <>
      <Helmet>
        <title>{`${movie.title}| Zappy`}</title>
      </Helmet>
      {notFound ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ width: '100%', height: '88vh' }}
        >
          <Status404 url={`/${Pathname.movies}`} />
        </Box>
      ) : (
        <Grid
          container
          spacing={3}
          flexDirection="column"
          sx={{ width: '100%', my: 2 }}
        >
          <Grid item xs={12}>
            <Typography variant="h2" gutterBottom textAlign="center">
              {`Phim: ${movie.title}`.toUpperCase()}&nbsp;
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {loadingPg ? (
              <SkeletonDetail />
            ) : (
              <Paper sx={{ p: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Grid
                      container
                      flexDirection="column"
                      sx={{ width: '100%' }}
                    >
                      <Grid item sx={{ width: '100%' }}>
                        <UploadImage
                          fileUpload={fileUp}
                          urlImage={
                            movie.thumbnail && isChangeFile
                              ? ''
                              : movie.thumbnail
                          }
                          setFileUpload={setFileUp}
                          notShowDelete={!isChangeFile}
                          style={{ height: '240px' }}
                        />
                      </Grid>
                      <Grid item>
                        {movie.thumbnail && (
                          <FormControlLabel
                            label="Thay đổi ảnh bộ phim"
                            control={
                              <Checkbox
                                checked={isChangeFile}
                                onChange={handleChangeFile}
                              />
                            }
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <FileUpload
                      value={video}
                      onChange={setVideo}
                      title="Chọn video cho phim tại đây"
                      accept="video/*"
                      buttonText="Tải video lên"
                      multiple={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <form onSubmit={handleSubmit(save)}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Controller
                            name="title"
                            control={control}
                            defaultValue={movie.title}
                            render={({
                              field: { onChange, value },
                              fieldState: { error }
                            }) => (
                              <TextField
                                label={'Tên Phim'}
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
                              />
                            )}
                            rules={{ required: 'Không được để trống!' }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Controller
                            name="minAge"
                            control={control}
                            defaultValue={movie.minAge}
                            render={({
                              field: { onChange, value },
                              fieldState: { error }
                            }) => (
                              <TextField
                                label={'Giới hạn độ tuổi'}
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
                                type="number"
                                InputProps={{
                                  endAdornment: (
                                    <Typography
                                      fontWeight="bold"
                                      sx={{ px: 1 }}
                                    >
                                      +
                                    </Typography>
                                  )
                                }}
                              />
                            )}
                            rules={{
                              required: 'Không được để trống!',
                              pattern: {
                                // prettier-ignore
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                message: 'Phải điền vào là một số nguyên dương!'
                              },
                              validate: (value) =>
                                value > 0 || 'Nhập số lớn hơn 0!'
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Controller
                            name="golds"
                            control={control}
                            defaultValue={movie.golds}
                            render={({
                              field: { onChange, value },
                              fieldState: { error }
                            }) => (
                              <TextField
                                label={'Giá Vàng'}
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
                                type="number"
                                InputProps={{
                                  endAdornment: (
                                    <Typography
                                      variant="caption"
                                      sx={{ px: 1 }}
                                    >
                                      Vàng
                                    </Typography>
                                  )
                                }}
                              />
                            )}
                            rules={{
                              required: 'Không được để trống!',
                              pattern: {
                                // prettier-ignore
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                message: 'Phải điền vào là một số nguyên dương!'
                              },
                              validate: (value) =>
                                value > 0 || 'Nhập số lớn hơn 0!'
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Controller
                            name="publishDate"
                            control={control}
                            defaultValue={new Date(movie.publishDate)}
                            render={({
                              field: { onChange, value },
                              fieldState: { error }
                            }) => (
                              <DatePicker
                                label="Ngày Phát Hành"
                                value={value}
                                onChange={onChange}
                                inputFormat="dd/MM/yyyy"
                                renderInput={(props: TextFieldProps) => (
                                  <TextField
                                    {...props}
                                    error={!!error}
                                    helperText={error?.message}
                                    variant="outlined"
                                    fullWidth
                                  />
                                )}
                              />
                            )}
                            rules={{
                              required: 'Không được để trống!',
                              pattern: {
                                // prettier-ignore
                                value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                                message:
                                  'Định dạng ngày tháng năm không chính xác!'
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Autocomplete
                            multiple
                            options={authors}
                            disableCloseOnSelect
                            defaultValue={movie.authors}
                            noOptionsText={'Không có kết quả phù hợp'}
                            onChange={(event, newValue: Author[]) =>
                              setAuthorIds(newValue.map((item) => item.id))
                            }
                            getOptionLabel={(option: Author) => option.name}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                  icon={
                                    <CheckBoxOutlineBlankIcon fontSize="small" />
                                  }
                                  checkedIcon={
                                    <CheckBoxIcon fontSize="small" />
                                  }
                                  checked={selected}
                                />
                                {option.name}
                              </li>
                            )}
                            renderInput={(params) => (
                              <TextField {...params} label="Tác Giả" />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Autocomplete
                            multiple
                            options={genres}
                            disableCloseOnSelect
                            defaultValue={movie.genres}
                            noOptionsText={'Không có kết quả phù hợp'}
                            onChange={(event, newValue: Genre[]) =>
                              setGenreIds(newValue.map((item) => item.id))
                            }
                            getOptionLabel={(option: Genre) => option.name}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                  icon={
                                    <CheckBoxOutlineBlankIcon fontSize="small" />
                                  }
                                  checkedIcon={
                                    <CheckBoxIcon fontSize="small" />
                                  }
                                  checked={selected}
                                />
                                {option.name}
                              </li>
                            )}
                            renderInput={(params) => (
                              <TextField {...params} label="Thể Loại" />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="select-label">
                              Trạng Thái
                            </InputLabel>
                            <Controller
                              name="state"
                              control={control}
                              defaultValue={movie.state}
                              rules={{ required: 'Trường này bắt buộc' }}
                              render={({
                                field: { onChange, value },
                                fieldState: { error }
                              }) => (
                                <Select
                                  labelId="select-label"
                                  value={value}
                                  onChange={onChange}
                                  error={!!error}
                                  label="Trạng Thái"
                                >
                                  <MenuItem value={0}>
                                    Đang hoạt động (Công khai)
                                  </MenuItem>
                                  <MenuItem value={1}>
                                    Chờ (Chưa công khai)
                                  </MenuItem>
                                </Select>
                              )}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Controller
                            name="desc"
                            control={control}
                            defaultValue={movie.desc}
                            render={({
                              field: { onChange, value },
                              fieldState: { error }
                            }) => (
                              <TextField
                                label={'Mô tả'}
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
                                multiline
                                minRows={4}
                                maxRows={6}
                              />
                            )}
                            rules={{ required: 'Không được để trống!' }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <LoadingButton
                            loading={loading}
                            type="submit"
                            variant="outlined"
                            color={loading ? 'secondary' : 'primary'}
                            autoFocus
                            sx={{ float: 'right' }}
                          >
                            <span>Cập Nhật Phim</span>
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default EditMovie;
