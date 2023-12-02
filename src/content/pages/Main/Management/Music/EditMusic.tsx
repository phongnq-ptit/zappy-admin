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
import { Pathname } from 'src/routes/path';
import { SuccessSnackbar, WarningSnackbar } from 'src/utils/ShowSnackbar';
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
import { IAddNewMusic, IMusic } from 'src/types/interfaces/Music';
import useMusicApi from 'src/hooks/useMusicApi';
import { useMusicStore } from './store';

const EditMusic = () => {
  const { handleSubmit, control, reset, watch, setValue } = useForm();
  const naviagate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [fileUp, setFileUp] = useState<File>();
  const [isChangeFile, setIsChangeFile] = useState<boolean>(false);
  const { upMusic, updateMusic, getMusicById } = useMusicApi();
  const { getGenreMusic } = useGenreApi();
  const { getAuthorMusic } = useAuthorApi();
  const { authors, getMovieAuthors, genres, getMovieGenres } = useMusicStore();
  const [genreIds, setGenreIds] = useState<number[]>([]);
  const [authorIds, setAuthorIds] = useState<number[]>([]);
  const [audio, setAudio] = useState<File[]>([]);
  const [isChangeAudio, setIsChangeAudio] = useState<boolean>(false);
  const [loadingPg, setLoadingPg] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isProcess, setIsProcess] = useState<boolean>(false);
  const [music, setMusic] = useState<IMusic>({
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

  const save = (data: Partial<IAddNewMusic>) => {
    if (isChangeFile && !fileUp) {
      WarningSnackbar('Thay đổi ảnh cần phải tải ảnh lên!');
      return;
    }
    if (isChangeAudio && !audio.length) {
      WarningSnackbar('Thay đổi audio cần phải tải audio lên!');
      return;
    }
    if (isChangeFile && fileUp) data.image = fileUp;
    data.authorIds = authorIds;
    data.genreIds = genreIds;
    setLoading(true);
    updateMusic(music.id, data)
      .then((response) => {
        if (response.success) {
          setMusic(response.data);
          if (isChangeAudio && audio.length) {
            setIsProcess(true);
            upMusic(music.id, { music: audio[0] }).finally(() => {
              SuccessSnackbar('Cập nhật thông tin nhạc thành công!');
              naviagate('/' + Pathname.movies);
              setIsProcess(false);
            });
          } else {
            SuccessSnackbar('Cập nhật thông tin nhạc thành công!');
          }
        }
      })
      .finally(() => {
        resetForm();
        setLoading(false);
      });
  };

  useEffect(() => {
    if (params.musicId) {
      reset();
      resetForm();
      setLoadingPg(true);
      Promise.all([
        getMovieAuthors(getAuthorMusic),
        getMovieGenres(getGenreMusic),
        getMusicById(Number(params.musicId)).then((response) => {
          if (response.data) {
            setMusic(response.data);
            setAuthorIds(response.data.authors.map((i) => i.id));
            setGenreIds(response.data.genres.map((i) => i.id));
          } else {
            setNotFound(response.errorCode === 'media_not_found');
          }
        })
      ]).finally(() => {
        setLoadingPg(false);
      });
    }
  }, [params.musicId]);

  const resetForm = () => {
    setFileUp(null);
    setIsChangeFile(false);
    setIsChangeAudio(false);
    setIsProcess(false);
    setLoading(false);
    setAudio([]);
    setGenreIds([]);
    setAuthorIds([]);
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setFileUp(undefined);
    }
    setIsChangeFile(event.target.checked);
  };

  const handleChangeAudio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setAudio([]);
    }
    setIsChangeAudio(event.target.checked);
  };

  return (
    <>
      <Helmet>
        <title>{`${music.title}| Zappy`}</title>
      </Helmet>
      {notFound ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ width: '100%', height: '88vh' }}
        >
          <Status404 url={`/${Pathname.musics}`} />
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
              {`Nhạc: ${music.title}`.toUpperCase()}&nbsp;
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
                            music.thumbnail && isChangeFile
                              ? ''
                              : music.thumbnail
                          }
                          setFileUpload={setFileUp}
                          notShowDelete={!isChangeFile}
                          style={{ height: '240px' }}
                        />
                      </Grid>
                      <Grid item>
                        {music.thumbnail && (
                          <FormControlLabel
                            label="Thay đổi ảnh bản nhạc"
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
                    <Grid
                      container
                      flexDirection="column"
                      sx={{ width: '100%' }}
                    >
                      <Grid item sx={{ width: '100%' }}>
                        <FileUpload
                          value={audio}
                          onChange={setAudio}
                          title="Chọn audip cho phim tại đây"
                          accept="audio/*"
                          buttonText="Tải audio lên"
                          multiple={false}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          label="Thay đổi video phim"
                          control={
                            <Checkbox
                              checked={isChangeAudio}
                              onChange={handleChangeAudio}
                            />
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <form onSubmit={handleSubmit(save)}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Controller
                            name="title"
                            control={control}
                            defaultValue={music.title}
                            render={({
                              field: { onChange, value },
                              fieldState: { error }
                            }) => (
                              <TextField
                                label={'Tên Nhạc'}
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
                            defaultValue={music.minAge}
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
                            defaultValue={music.golds}
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
                            defaultValue={new Date(music.publishDate)}
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
                            defaultValue={music.authors}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
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
                            defaultValue={music.genres}
                            noOptionsText={'Không có kết quả phù hợp'}
                            onChange={(event, newValue: Genre[]) =>
                              setGenreIds(newValue.map((item) => item.id))
                            }
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
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
                              defaultValue={music.state}
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
                            defaultValue={music.desc}
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
                            <span>Cập Nhật Bản Nhạc</span>
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
export default EditMusic;
