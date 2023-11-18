import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import { GlobalContext } from 'src/contexts/GlobalContext';
import useUserApi from 'src/hooks/useUserApi';
import { IUpdateUser } from 'src/types/interfaces/User';
import { SuccessSnackbar } from 'src/utils/ShowSnackbar';

const useStyles = makeStyles({
  title: {
    fontSize: '1rem !important',
    fontWeight: '600 !important'
  },
  updateBtn: {
    marginTop: '0.8rem !important',
    float: 'right'
  },
  helpText: {
    fontSize: '0.76rem',
    fontWeight: 500,
    color: 'rgba(0,0,0,0.4)'
  }
});

const Infomation = () => {
  const classes = useStyles();
  const { LoginUser, setLoginUser } = useContext(GlobalContext);
  const { updateUser } = useUserApi();
  const { handleSubmit, control, reset } = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    reset();
  }, []);

  const save = (data: IUpdateUser) => {
    data.isActive = Boolean(data.isActive);
    setLoading(true);
    updateUser(LoginUser.id, data)
      .then((response) => {
        SuccessSnackbar('Cập nhật thông tin thành công!');
        // update login user
        const newLoginUser = { ...LoginUser, ...data };
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(newLoginUser));
        setLoginUser(newLoginUser);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 750);
      });
  };

  return (
    <>
      <Helmet>
        <title>Thông tin cá nhân | Zappy</title>
      </Helmet>
      <Paper sx={{ px: 5, pt: 5, pb: 3, mt: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container flexDirection="column" alignItems="center">
              <Grid item>
                <Avatar
                  variant="circular"
                  sx={{
                    backgroundImage:
                      'url(https://source.unsplash.com/random?wallpapers)',
                    width: 150,
                    height: 150,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontSize: '3rem'
                  }}
                >
                  {LoginUser.username.slice(0, 2).toUpperCase()}
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              flexDirection="column"
              alignItems="center"
              spacing={4}
            >
              <Grid item xs={12}>
                <form id="update-info" onSubmit={handleSubmit(save)}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Controller
                        name="username"
                        control={control}
                        defaultValue={LoginUser.username}
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
                        rules={{
                          required: 'Không được để trống!'
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        disabled
                        label={'Email'}
                        variant="outlined"
                        value={LoginUser.email}
                        helperText={
                          <span className={classes.helpText}>
                            Thông tin Email không được thay đổi!
                          </span>
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name="phone"
                        control={control}
                        defaultValue={LoginUser.phone}
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
                        defaultValue={LoginUser.address}
                        render={({
                          field: { onChange, value },
                          fieldState: { error }
                        }) => (
                          <TextField
                            label={'Địa chỉ'}
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            fullWidth
                          />
                        )}
                        rules={{
                          required: 'Không được để trống!'
                        }}
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
                          defaultValue={LoginUser.isActive ? 1 : 0}
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
                              disabled
                            >
                              <MenuItem value={0}>Không</MenuItem>
                              <MenuItem value={1}>Đã kích hoạt</MenuItem>
                            </Select>
                          )}
                        />
                        <FormHelperText>
                          <span className={classes.helpText}>
                            Không thể tự thay đổi thông tin này!
                          </span>
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item xs={12}>
                <Divider />
                <LoadingButton
                  className={classes.updateBtn}
                  loading={loading}
                  type="submit"
                  form="update-info"
                  variant="outlined"
                  color={loading ? 'secondary' : 'primary'}
                  autoFocus
                >
                  <span>Cập nhật thông tin</span>
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Infomation;
