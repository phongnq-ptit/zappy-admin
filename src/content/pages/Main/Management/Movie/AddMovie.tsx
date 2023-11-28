import { DatePicker, LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
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
import { useNavigate } from 'react-router';
import UploadImage from 'src/components/UploadFile/UploadImage';
import useMovieApi from 'src/hooks/useMovieApi';
import { Pathname } from 'src/routes/path';
import { IAddNewMovie } from 'src/types/interfaces/Movie';
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

const AddMovie = () => {
  const { handleSubmit, control, reset, watch, setValue } = useForm();
  const naviagate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [fileUp, setFileUp] = useState<File>();
  const { createMovie, upVideo } = useMovieApi();
  const { getGenreMovie } = useGenreApi();
  const { getAuthorMovie } = useAuthorApi();
  const { authors, getMovieAuthors, genres, getMovieGenres } = useMovieStore();
  const [genreIds, setGenreIds] = useState<number[]>([]);
  const [authorIds, setAuthorIds] = useState<number[]>([]);
  const [video, setVideo] = useState<File[]>([]);
  const [isProcess, setIsProcess] = useState<boolean>(false);

  const save = (data: IAddNewMovie) => {
    if (fileUp) data.image = fileUp;
    else {
      WarningSnackbar('Cần phải tải ảnh lên!');
      return;
    }
    if (!video.length) {
      WarningSnackbar('Cần phải tải video lên!');
      return;
    }
    let isSuccess = false;
    data.authorIds = authorIds;
    data.genreIds = genreIds;
    setLoading(true);
    createMovie(data)
      .then((response) => {
        if (response.success) {
          isSuccess = response.success;
          setIsProcess(true);
          upVideo(response.data.id, { movie: video[0] })
            .then((_response) => {
              if (_response.success) {
                SuccessSnackbar('Thêm phim mới thành công!');
              }
            })
            .catch((e) => console.log(e))
            .finally(() => {
              resetForm();
              setIsProcess(false);
              naviagate('/' + Pathname.movies);
            });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    resetForm();
    getMovieAuthors(getAuthorMovie);
    getMovieGenres(getGenreMovie);
  }, []);

  const resetForm = () => {
    setLoading(false);
    reset();
    setFileUp(null);
    setVideo([]);
    setGenreIds([]);
    setAuthorIds([]);
  };

  return (
    <>
      <Helmet>
        <title>{`Tạo phim mới| Zappy`}</title>
      </Helmet>
      <Grid
        container
        spacing={3}
        flexDirection="column"
        sx={{ width: '100%', my: 2 }}
      >
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom textAlign="center">
            {`Tạo phim mới `.toUpperCase()}&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <UploadImage
                  fileUpload={fileUp}
                  setFileUpload={setFileUp}
                  style={{ height: '240px' }}
                />
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
                        defaultValue={''}
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
                        defaultValue={''}
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
                                <Typography fontWeight="bold" sx={{ px: 1 }}>
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
                          validate: (value) => value > 0 || 'Nhập số lớn hơn 0!'
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name="golds"
                        control={control}
                        defaultValue={''}
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
                                <Typography variant="caption" sx={{ px: 1 }}>
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
                          validate: (value) => value > 0 || 'Nhập số lớn hơn 0!'
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name="publishDate"
                        control={control}
                        defaultValue={new Date()}
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
                            message: 'Định dạng ngày tháng năm không chính xác!'
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Autocomplete
                        multiple
                        options={authors}
                        disableCloseOnSelect
                        defaultValue={[]}
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
                              checkedIcon={<CheckBoxIcon fontSize="small" />}
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
                        defaultValue={[]}
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
                              checkedIcon={<CheckBoxIcon fontSize="small" />}
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
                        <InputLabel id="select-label">Trạng Thái</InputLabel>
                        <Controller
                          name="state"
                          control={control}
                          defaultValue={1}
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
                        defaultValue={''}
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
                        <span>Tạo Phim Mới</span>
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Dialog onClose={() => {}} open={isProcess}>
        <DialogTitle>
          Quá trình tải video có thể mất vài phút. Vui lòng chờ trong giây lát!
        </DialogTitle>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          width="100%"
          sx={{ py: 4 }}
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default AddMovie;
