import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAccountStore } from '../store';
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';
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

const EditAccount = () => {
  const classes = useStyles();
  const { handleSubmit, control, reset } = useForm();
  const { updateUser } = useUserApi();
  const { account, onChangeAccount } = useAccountStore();
  const [loading, setLoading] = useState<boolean>(false);

  const save = (data: IUpdateUser) => {
    data.isActive = Boolean(data.isActive);
    setLoading(true);
    updateUser(account.id, data)
      .then((response) => {
        SuccessSnackbar('Cập nhật thông tin người dùng thành công!');
        onChangeAccount({ ...account, ...data });
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          reset();
        }, 750);
      });
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <Paper sx={{ mt: 2 }}>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12}>
          <Typography pb={2} className={classes.title}>
            Chỉnh Sửa Thông Tin
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <form id="form-update-user" onSubmit={handleSubmit(save)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name="username"
                  control={control}
                  defaultValue={account.username}
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
                  value={account.email}
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
                  defaultValue={account.phone}
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
                  defaultValue={account.address}
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
                  <InputLabel id="select-label">Kích hoạt tài khoản</InputLabel>
                  <Controller
                    name="isActive"
                    control={control}
                    defaultValue={account.isActive ? 1 : 0}
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
                        <MenuItem value={1}>Đã kích hoạt</MenuItem>
                      </Select>
                    )}
                  />
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
            form="form-update-user"
            variant="outlined"
            color={loading ? 'secondary' : 'primary'}
            autoFocus
          >
            <span>Cập nhật</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EditAccount;
