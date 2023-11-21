import { LoadingButton } from '@mui/lab';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import useUserApi from 'src/hooks/useUserApi';
import { useNavigate } from 'react-router';
import { Pathname } from 'src/routes/path';
import { SuccessSnackbar } from 'src/utils/ShowSnackbar';

const AddNewAccount = () => {
  const { handleSubmit, control, reset } = useForm();
  const naviagate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [hidePass, setHidePass] = useState<boolean>(false);
  const { createUser } = useUserApi();

  const save = (data: any) => {
    setLoading(true);
    data.isActive = Boolean(data.isActive);
    createUser(data)
      .then((response) => {
        SuccessSnackbar('Tạo tài khoản mới thành công!');
      })
      .finally(() => {
        setLoading(false);
        naviagate('/' + Pathname.users);
      });
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Tạo tài khoản| Zappy`}</title>
      </Helmet>
      <Grid
        container
        spacing={3}
        flexDirection="column"
        sx={{ width: '100%', my: 2 }}
      >
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom textAlign="center">
            {`Tạo Tài khoản mới `.toUpperCase()}&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 4 }}>
            <form onSubmit={handleSubmit(save)}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="username"
                    control={control}
                    defaultValue={''}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        label={'Tên người dùng'}
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
                    name="email"
                    control={control}
                    defaultValue={''}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        label={'Email'}
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        fullWidth
                        type="email"
                      />
                    )}
                    rules={{
                      required: 'Không được để trống!',
                      pattern: {
                        // prettier-ignore
                        value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                        message: 'Định dạng email không chính xác!'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue={''}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        label={'Số điện thoại'}
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        fullWidth
                      />
                    )}
                    rules={{
                      required: 'Không được để trống!',
                      pattern: {
                        // prettier-ignore
                        value: /^\d{10}$/,
                        message:
                          'Số điện thoại chỉ được điền chữ số và phải có đủ 10 ký tự chữ số.'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="address"
                    control={control}
                    defaultValue={''}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        label={'Địa Chỉ'}
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
                    name="password"
                    control={control}
                    defaultValue={''}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        label={'Mật khẩu'}
                        type={!hidePass && 'password'}
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        fullWidth
                        InputProps={{
                          endAdornment: !hidePass ? (
                            <IconButton onClick={() => setHidePass(true)}>
                              <RemoveRedEyeOutlinedIcon />
                            </IconButton>
                          ) : (
                            <IconButton onClick={() => setHidePass(false)}>
                              <VisibilityOffOutlinedIcon />
                            </IconButton>
                          )
                        }}
                      />
                    )}
                    rules={{ required: 'Không được để trống!' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="select-label">
                      Kích hoạt tài khoản
                    </InputLabel>
                    <Controller
                      name="isActive"
                      control={control}
                      defaultValue={0}
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
                          label="Kích hoạt tài khoản"
                        >
                          <MenuItem value={0}>Không</MenuItem>
                          <MenuItem value={1}>Kích hoạt</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
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
                    <span>Thêm Tài Khoản Mới</span>
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AddNewAccount;
