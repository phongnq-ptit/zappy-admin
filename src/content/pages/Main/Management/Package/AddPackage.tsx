import { DatePicker, LoadingButton } from '@mui/lab';
import {
  FormControl,
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
import { useNavigate } from 'react-router';
import UploadImage from 'src/components/UploadFile/UploadImage';
import usePackageApi from 'src/hooks/usePackageApi';
import { Pathname } from 'src/routes/path';
import { IAddNewPackage } from 'src/types/interfaces/Package';
import { SuccessSnackbar, WarningSnackbar } from 'src/utils/ShowSnackbar';

const AddPackage = () => {
  const { handleSubmit, control, reset, watch, setValue } = useForm();
  const naviagate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [fileUp, setFileUp] = useState<File>();
  const { createPackage } = usePackageApi();

  const startDate = watch('startDate');

  const save = (data: IAddNewPackage) => {
    if (fileUp) data.image = fileUp;
    else {
      WarningSnackbar('Cần phải tải ảnh lên!');
      return;
    }
    setLoading(true);
    createPackage(data)
      .then((response) => {
        SuccessSnackbar('Tạo gói ưu đãi mới thành công!');
      })
      .finally(() => {
        setLoading(false);
        setFileUp(null);
        naviagate('/' + Pathname.package);
      });
  };

  useEffect(() => {
    reset();
    setFileUp(null);
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Tạo gói ưu đãi| Zappy`}</title>
      </Helmet>
      <Grid
        container
        spacing={3}
        flexDirection="column"
        sx={{ width: '100%', my: 2 }}
      >
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom textAlign="center">
            {`Tạo gói ưu đãi `.toUpperCase()}&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  sx={{ height: '86%' }}
                >
                  <Grid item>
                    <UploadImage
                      fileUpload={fileUp}
                      setFileUpload={setFileUp}
                      style={{ height: '390px' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={9}>
                <form onSubmit={handleSubmit(save)}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue={''}
                        render={({
                          field: { onChange, value },
                          fieldState: { error }
                        }) => (
                          <TextField
                            label={'Tên Gói'}
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
                        name="price"
                        control={control}
                        defaultValue={''}
                        render={({
                          field: { onChange, value },
                          fieldState: { error }
                        }) => (
                          <TextField
                            label={'Giá gốc'}
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            fullWidth
                            type="number"
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
                            label={'Vàng quy đổi'}
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            fullWidth
                            type="number"
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
                        name="discount"
                        control={control}
                        defaultValue={''}
                        render={({
                          field: { onChange, value },
                          fieldState: { error }
                        }) => (
                          <TextField
                            label={'Phần trăm giảm giá'}
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            fullWidth
                            type="number"
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
                        name="startDate"
                        control={control}
                        defaultValue={new Date()}
                        render={({
                          field: { onChange, value },
                          fieldState: { error }
                        }) => (
                          <DatePicker
                            label="Ngày Bắt Đầu"
                            value={value}
                            onChange={(date) => {
                              onChange(date);
                              setValue('endDate', '', { shouldValidate: true });
                            }}
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
                      <Controller
                        name="endDate"
                        control={control}
                        defaultValue={new Date()}
                        render={({
                          field: { onChange, value },
                          fieldState: { error }
                        }) => (
                          <DatePicker
                            label="Ngày hết hạn"
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
                          },
                          validate: (value) =>
                            new Date(value).getTime() >
                              new Date(startDate).getTime() ||
                            'Ngày hết hạn phải lớn hơn Ngày Bắt Đầu'
                        }}
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
                        <span>Tạo Gói Ưu Đãi Mới</span>
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AddPackage;
