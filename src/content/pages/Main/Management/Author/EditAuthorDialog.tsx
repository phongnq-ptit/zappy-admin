import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import FormInput from 'src/components/Input/FormInput';
import useAuthorApi from 'src/hooks/useAuthorApi';
import { TypeItem } from 'src/types/enums/TypeItem';
import { Author, INewAuthor } from 'src/types/interfaces/Author';
import { SuccessSnackbar } from 'src/utils/ShowSnackbar';
import CloseIcon from '@mui/icons-material/Close';
import UploadImage from 'src/components/UploadFile/UploadImage';
import { EAuthorTabs, useAuthorStore } from './store';
import _ from 'lodash';
import { getDiff } from 'src/utils/Helper';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  authorEdit: Author;
}

const EditAuthorDialog = (props: Props) => {
  const theme = useTheme();
  const { handleSubmit, control, reset } = useForm();
  const { updateAuthor } = useAuthorApi();
  const [loadingBtn, setLoadingBtn] = React.useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [isChangeImage, setIsChangeImage] = useState<boolean>(false);
  const { authors, onChangeAuthors } = useAuthorStore();

  React.useEffect(() => {
    reset();
  }, [props.authorEdit]);

  const save = (data: Partial<INewAuthor>) => {
    setLoadingBtn(true);

    if (isChangeImage && image) data.image = image;

    updateAuthor(props.authorEdit.id, getDiff(data, props.authorEdit))
      .then((response) => {
        onChangeAuthors(
          authors.map((item) =>
            item.id === props.authorEdit.id ? response.data : item
          )
        );
        SuccessSnackbar('Cập nhật thông tin tác giả thành công!');
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoadingBtn(false);
        reset();
        setImage(undefined);
        setIsChangeImage(false);
        props.setOpen(false);
      });
  };

  const handleClose = () => {
    reset();
    setImage(undefined);
    setIsChangeImage(false);
    props.setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setImage(undefined);
    }
    setIsChangeImage(event.target.checked);
  };

  return (
    <div>
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
          Cập nhật tác giả
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
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <UploadImage
                fileUpload={image}
                urlImage={
                  props.authorEdit.image && isChangeImage
                    ? ''
                    : props.authorEdit.image
                }
                setFileUpload={setImage}
                notShowDelete={!isChangeImage}
              />
              {props.authorEdit.image && (
                <FormControlLabel
                  label="Thay đổi ảnh tác giả"
                  control={
                    <Checkbox checked={isChangeImage} onChange={handleChange} />
                  }
                />
              )}
            </Grid>
            <Grid item xs={8}>
              <form id="form-add-author" onSubmit={handleSubmit(save)}>
                <Box sx={{ width: '100%', mb: 2 }}>
                  <FormInput
                    name="name"
                    label="Tên tác giả"
                    control={control}
                    defaultValue={props.authorEdit.name}
                    rules={{
                      required: 'Không được để trống!'
                    }}
                  />
                </Box>
                <Box sx={{ width: '100%', mb: 2 }}>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue={props.authorEdit.description}
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
                </Box>
                <FormControl sx={{ width: '100%' }}>
                  <InputLabel id="select-label">Loại</InputLabel>
                  <Controller
                    name="type"
                    control={control}
                    defaultValue={props.authorEdit.type}
                    rules={{ required: 'Trường này bắt buộc' }}
                    render={({ field }) => (
                      <Select labelId="select-label" {...field} label="Loại">
                        <MenuItem value={TypeItem.Comics}>Truyện</MenuItem>
                        <MenuItem value={TypeItem.Movies}>Phim</MenuItem>
                        <MenuItem value={TypeItem.Music}>Nhạc</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </form>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={loadingBtn}
            type="submit"
            form="form-add-author"
            variant="outlined"
            color={loadingBtn ? 'secondary' : 'primary'}
            autoFocus
          >
            <span>Cập nhật</span>
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
    </div>
  );
};

export default EditAuthorDialog;
