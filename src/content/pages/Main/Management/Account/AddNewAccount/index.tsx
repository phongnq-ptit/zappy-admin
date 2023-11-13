import { LoadingButton } from '@mui/lab';
import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';

const AddNewAccount = () => {
  const { handleSubmit, control, reset } = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    reset();
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Tạp tài khoản| Zappy`}</title>
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
          <form>
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
              <Grid item xs={12}>
                <LoadingButton
                  loading={loading}
                  type="submit"
                  variant="outlined"
                  color={loading ? 'secondary' : 'primary'}
                  autoFocus
                >
                  <span>Thêm Tài Khoản Mới</span>
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default AddNewAccount;
