import { DatePicker, LoadingButton } from '@mui/lab';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BootstrapDialog } from 'src/components/Dialog/BootstapDialog';
import UploadImage from 'src/components/UploadFile/UploadImage';
import { ICreateProfile } from 'src/types/interfaces/User';
import CloseIcon from '@mui/icons-material/Close';
import useProfileApi from 'src/hooks/useProfileApi';
import { SuccessSnackbar } from 'src/utils/ShowSnackbar';
import { useAccountDetail } from '../store';
import { useAccountStore } from '../../store';
import { format } from 'date-fns';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const AddProfileDialog = (props: Props) => {
  const theme = useTheme();
  const { handleSubmit, control, reset } = useForm();
  const { createProfile } = useProfileApi();
  const [loadingBtn, setLoadingBtn] = React.useState(false);
  const [image, setImage] = useState<File>();
  const { profiles, onChangeProfiles } = useAccountDetail();
  const { account, onChangeAccount } = useAccountStore();

  const save = (data: ICreateProfile) => {
    setLoadingBtn(true);

    if (image) data.avatar = image;
    data.isLocked = Boolean(data.isLocked);
    data.birthday = format(new Date(data.birthday), 'yyyy-MM-dd');

    createProfile({ ...data, userId: account.id })
      .then((response) => {
        SuccessSnackbar('Tạo hồ sơ mới thành công!');
        const newProfiles = [response.data, ...profiles];
        onChangeProfiles(newProfiles);
        onChangeAccount({ ...account, profiles: newProfiles });
      })
      .finally(() => {
        setLoadingBtn(false);
        reset();
        setImage(null);
        props.setOpen(false);
      });
  };

  const handleClose = () => {
    reset();
    setImage(null);
    props.setOpen(false);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          fontSize: '1.2rem',
          fontWeight: 700,
          color: theme.colors.secondary.dark
        }}
        id="customized-dialog-title"
      >
        Thêm Hồ Sơ Mới
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 9,
          top: 9,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Grid container spacing={2} px={1} pt={2}>
          <Grid item xs={12}>
            <form id={`add-profile-dialog`} onSubmit={handleSubmit(save)}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <Grid
                    container
                    flexDirection="column"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <UploadImage
                        fileUpload={image}
                        setFileUpload={setImage}
                        style={{
                          height: '160px',
                          width: '160px'
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Controller
                        name="nickname"
                        control={control}
                        defaultValue={''}
                        render={({
                          field: { onChange, value },
                          fieldState: { error }
                        }) => (
                          <TextField
                            label={'Tên hồ sơ (nickname)'}
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
                      <Controller
                        name="birthday"
                        control={control}
                        defaultValue={new Date()}
                        render={({
                          field: { onChange, value },
                          fieldState: { error }
                        }) => (
                          <DatePicker
                            label="Ngày Sinh"
                            value={value}
                            onChange={onChange}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(props: TextFieldProps) => (
                              <TextField
                                {...props}
                                error={!!error}
                                helperText={error?.message}
                                variant="outlined"
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
                      <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="select-label">
                          Trạng Thái Hồ Sơ
                        </InputLabel>
                        <Controller
                          name="isLocked"
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
                              label="Trạng Thái Hồ Sơ"
                            >
                              <MenuItem value={0}>Hoạt Động</MenuItem>
                              <MenuItem value={1}>Khóa Hoạt Động</MenuItem>
                            </Select>
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loadingBtn}
          type="submit"
          form="add-profile-dialog"
          variant="outlined"
          color={loadingBtn ? 'secondary' : 'primary'}
          autoFocus
        >
          <span>Thêm hồ sơ mới</span>
        </LoadingButton>
        <Button
          variant="outlined"
          color="inherit"
          autoFocus
          onClick={handleClose}
        >
          Đóng
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default AddProfileDialog;
