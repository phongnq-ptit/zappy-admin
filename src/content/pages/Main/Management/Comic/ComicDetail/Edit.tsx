import React, { useEffect, useState } from 'react';
import { useComicStore } from '../store';
import { Controller, useForm } from 'react-hook-form';
import {
  Autocomplete,
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
import { IAddNewComic } from 'src/types/interfaces/Comic';
import UploadImage from 'src/components/UploadFile/UploadImage';
import { DatePicker, LoadingButton } from '@mui/lab';
import { Author } from 'src/types/interfaces/Author';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Genre } from 'src/types/interfaces/Genre';
import useComicApi from 'src/hooks/useComicApi';
import useAuthorApi from 'src/hooks/useAuthorApi';
import useGenreApi from 'src/hooks/useGenreApi';
import { SuccessSnackbar, WarningSnackbar } from 'src/utils/ShowSnackbar';

const Edit = () => {
  const {
    comic,
    onChangeComic,
    onChangeTabs,
    authors,
    genres,
    getComicAuthors,
    getComicGenres,
    refeshApi
  } = useComicStore();
  const { handleSubmit, control, reset, watch, setValue } = useForm();

  const { updateComic } = useComicApi();
  const { getAuthorComic } = useAuthorApi();
  const { getGenreComic } = useGenreApi();

  const [fileUp, setFileUp] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isChangeFile, setIsChangeFile] = useState(false);

  const [genreIds, setGenreIds] = useState<number[]>(
    comic.genres.map((item) => item.id)
  );
  const [authorIds, setAuthorIds] = useState<number[]>(
    comic.authors.map((item) => item.id)
  );

  useEffect(() => {
    getComicAuthors(getAuthorComic);
    getComicGenres(getGenreComic);
  }, []);

  const resetForm = () => {
    setFileUp(null);
    setIsChangeFile(false);
    setLoading(false);
    setGenreIds([]);
    setAuthorIds([]);
  };

  const save = (data: Partial<IAddNewComic>) => {
    if (isChangeFile && !fileUp) {
      WarningSnackbar('Thay đổi ảnh cần phải tải ảnh lên!');
      return;
    }
    if (isChangeFile && fileUp) data.thumbnail = fileUp;
    data.authorIds = authorIds;
    data.genreIds = genreIds;
    setLoading(true);
    updateComic(comic.id, data)
      .then((response) => {
        if (response.success) {
          SuccessSnackbar('Cập nhật thông tin truyện thành công!');
          refeshApi();
          onChangeTabs('summary');
        }
      })
      .finally(() => {
        resetForm();
        setLoading(false);
      });
  };

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Grid item>
              <Grid container flexDirection="column" sx={{ width: '100%' }}>
                <Grid item sx={{ width: '100%' }}>
                  <UploadImage
                    fileUpload={fileUp}
                    urlImage={
                      comic.thumbnail && isChangeFile ? '' : comic.thumbnail
                    }
                    setFileUpload={setFileUp}
                    notShowDelete={!isChangeFile}
                    style={{ height: '240px', width: '400px' }}
                  />
                </Grid>
                <Grid item>
                  {comic.thumbnail && (
                    <FormControlLabel
                      label="Thay đổi ảnh của truyện"
                      control={
                        <Checkbox
                          checked={isChangeFile}
                          onChange={() => setIsChangeFile(!isChangeFile)}
                        />
                      }
                    />
                  )}
                </Grid>
              </Grid>
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
                  defaultValue={comic.title}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      label={'Tên truyện'}
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
                  defaultValue={comic.minAge}
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
                  defaultValue={comic.golds}
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
                  defaultValue={new Date(comic.publishDate)}
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
                  defaultValue={comic.authors}
                  noOptionsText={'Không có kết quả phù hợp'}
                  onChange={(event, newValue: Author[]) =>
                    setAuthorIds(newValue.map((item) => item.id))
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option: Author) => option.name}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
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
                  defaultValue={comic.genres}
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
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
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
                    defaultValue={comic.state}
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
                        <MenuItem value={1}>Chờ (Chưa công khai)</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="desc"
                  control={control}
                  defaultValue={comic.desc}
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
                  <span>Cập Nhật</span>
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Edit;
