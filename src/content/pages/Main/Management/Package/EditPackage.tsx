import { DatePicker, LoadingButton } from '@mui/lab';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  TextFieldProps,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import UploadImage from 'src/components/UploadFile/UploadImage';
import Status404 from 'src/content/pages/Status/Status404';
import usePackageApi from 'src/hooks/usePackageApi';
import { Pathname } from 'src/routes/path';
import { IPackage, IUpdatePackage } from 'src/types/interfaces/Package';
import { SuccessSnackbar, WarningSnackbar } from 'src/utils/ShowSnackbar';
import SkeletonDetail from './SkeletonDetail';

const useStyles = makeStyles({
  helpText: {
    fontSize: '0.76rem',
    fontWeight: 500,
    color: 'rgba(0,0,0,0.4)'
  }
});

const EditPackage = () => {
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loadingPg, setLoadingPg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileUp, setFileUp] = useState<File>();
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isEditImg, setIsEditImg] = useState<boolean>(false);
  const [pkg, setPkg] = useState<IPackage>({
    id: 9999,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '',
    price: 0,
    golds: 0,
    discount: 20,
    state: 1,
    image: '',
    startDate: new Date(),
    endDate: new Date(),
    desc: ''
  });

  const classes = useStyles();
  const params = useParams();
  const { getPackageById, updatePackage } = usePackageApi();
  const { handleSubmit, control, reset, setValue, watch } = useForm();

  const startDate = watch('startDate');

  useEffect(() => {
    reset();
    if (params.packageId) {
      setLoadingPg(true);
      getPackageById(Number(params.packageId))
        .then((response) => {
          if (response.data) {
            setPkg(response.data);
            setIsExpired(
              new Date(response.data.endDate).getTime() < new Date().getTime()
            );
            setIsEditImg(!response.data.image);
          } else {
            setNotFound(response.errorCode === 'package_not_found');
          }
        })
        .catch((e) => {
          if (e.response.data.errorCode === 'package_not_found')
            setNotFound(true);
        })
        .finally(() => {
          setTimeout(() => {
            setLoadingPg(false);
          }, 750);
        });
    }
  }, [params.packageId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setFileUp(undefined);
    }
    setIsEditImg(event.target.checked);
  };

  const save = (data: IUpdatePackage) => {
    if (fileUp) data.image = fileUp;
    setLoading(true);
    updatePackage(pkg.id, data)
      .then((response) => {
        if (response.success) {
          SuccessSnackbar('Cập nhật gói ưu đãi thành công!');
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
          <Status404 url={`/${Pathname.package}`} />
        </Box>
      ) : (
        <>
          {loadingPg ? (
            <SkeletonDetail />
          ) : (
            <>
              <Helmet>
                <title>{`${pkg.name.toUpperCase()} | Zappy`}</title>
              </Helmet>
              <Grid
                container
                spacing={2}
                flexDirection="column"
                sx={{ width: '100%', my: 2 }}
              >
                <Grid item xs={12}>
                  <Typography variant="h2" gutterBottom textAlign="center">
                    {`Gói Ưu Đãi: ${pkg.name}`.toUpperCase()}&nbsp;
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
                              urlImage={pkg.image && isEditImg ? '' : pkg.image}
                              setFileUpload={setFileUp}
                              notShowDelete={!isEditImg}
                              style={{
                                height: '370px'
                              }}
                            />
                          </Grid>
                          <Grid item>
                            {pkg.image && (
                              <FormControlLabel
                                label="Thay đổi ảnh gói ưu đãi"
                                control={
                                  <Checkbox
                                    checked={isEditImg}
                                    onChange={handleChange}
                                  />
                                }
                              />
                            )}
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
                                defaultValue={pkg.name}
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
                                defaultValue={pkg.price}
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
                                    message:
                                      'Phải điền vào là một số nguyên dương!'
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
                                defaultValue={pkg.golds}
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
                                    message:
                                      'Phải điền vào là một số nguyên dương!'
                                  },
                                  validate: (value) =>
                                    value > 0 || 'Nhập số lớn hơn 0!'
                                }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Controller
                                name="discount"
                                control={control}
                                defaultValue={pkg.discount}
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
                                    message:
                                      'Phải điền vào là một số nguyên dương!'
                                  },
                                  validate: (value) =>
                                    value > 0 || 'Nhập số lớn hơn 0!'
                                }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Controller
                                name="startDate"
                                control={control}
                                defaultValue={new Date(pkg.startDate)}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error }
                                }) => (
                                  <DatePicker
                                    label="Ngày Bắt Đầu"
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
                              <Controller
                                name="endDate"
                                control={control}
                                defaultValue={new Date(pkg.endDate)}
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
                                    message:
                                      'Định dạng ngày tháng năm không chính xác!'
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
                                <InputLabel id="select-label">
                                  Trạng Thái
                                </InputLabel>
                                <Controller
                                  name="state"
                                  control={control}
                                  defaultValue={pkg.state}
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
                                {isExpired && (
                                  <FormHelperText>
                                    <span className={classes.helpText}>
                                      Gói ưu đãi này không hiển thị đến người
                                      dùng do đã hết hạn!
                                    </span>
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <Controller
                                name="desc"
                                control={control}
                                defaultValue={pkg.desc}
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
                                <span>Cập Nhật Gói Ưu Đãi</span>
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
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default EditPackage;
