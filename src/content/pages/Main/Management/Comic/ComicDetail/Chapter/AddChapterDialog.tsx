import { LoadingButton } from '@mui/lab';
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
  Typography,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { BootstrapDialog } from 'src/components/Dialog/BootstapDialog';
import CloseIcon from '@mui/icons-material/Close';
import { Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useForm } from 'react-hook-form';
import { IAddNewChapter } from 'src/types/interfaces/Comic';
import { SuccessSnackbar, WarningSnackbar } from 'src/utils/ShowSnackbar';
import useChapterApi from 'src/hooks/useChapterApi';
import { useComicStore } from '../../store';
import { useChapterStore } from '../store';

interface Props {
  open: boolean;
  setOpen: Function;
}

const AddChapterDialog = ({ open, setOpen }: Props) => {
  const theme = useTheme();
  const { handleSubmit, control, reset, watch, setValue } = useForm();
  const { createChapter } = useChapterApi();
  const { comic } = useComicStore();
  const { reload, refeshApi } = useChapterStore();

  const [loadingBtn, setLoadingBtn] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // up file
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const save = (data: IAddNewChapter) => {
    if (fileList.length === 0) {
      WarningSnackbar('Phải tải ảnh lên!');
      return;
    }
    data.images = fileList.map((file) => file.originFileObj as Blob);
    data.comicId = comic.id;
    setLoadingBtn(true);
    createChapter(data)
      .then((response) => {
        if (response.success) {
          SuccessSnackbar('Thêm chapter mới thành công!');
          refeshApi();
        }
      })
      .finally(() => {
        setLoadingBtn(false);
        setOpen(false);
      });
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
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
          Thêm tập mới
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
          disabled={loadingBtn}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form id="add-chapter" onSubmit={handleSubmit(save)}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Controller
                  name="chap"
                  control={control}
                  defaultValue={1}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      label={'Tập số'}
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
                  name="name"
                  control={control}
                  defaultValue={''}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      label={'Tên tập'}
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
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
                        <MenuItem value={1}>
                          Đang hoạt động (Công khai)
                        </MenuItem>
                        <MenuItem value={0}>Chờ (Chưa công khai)</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Tải ảnh lên:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChange}
                  accept="image/*"
                  multiple={true}
                >
                  <div>
                    <AddIcon />
                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                  </div>
                </Upload>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={loadingBtn}
            type="submit"
            form="add-chapter"
            variant="outlined"
            color={loadingBtn ? 'secondary' : 'primary'}
            autoFocus
          >
            <span>Thêm mới</span>
          </LoadingButton>
          <Button
            variant="outlined"
            color="inherit"
            autoFocus
            onClick={handleClose}
            disabled={loadingBtn}
          >
            Đóng
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default AddChapterDialog;
