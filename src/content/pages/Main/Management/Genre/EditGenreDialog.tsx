import * as React from 'react';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import FormInput from 'src/components/Input/FormInput';
import { Controller, useForm } from 'react-hook-form';
import { Genre, INewGenre } from 'src/types/interfaces/Genre';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { TypeItem } from 'src/types/enums/TypeItem';
import useGenreApi from 'src/hooks/useGenreApi';
import { LoadingButton } from '@mui/lab';
import { SuccessSnackbar } from 'src/utils/ShowSnackbar';

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
  genre: Genre;
}

const EditGenreDialog = (props: Props) => {
  const theme = useTheme();
  const { handleSubmit, control, reset } = useForm();
  const { updateGenre } = useGenreApi();
  const [loadingBtn, setLoadingBtn] = React.useState(false);

  const save = (data: INewGenre) => {
    setLoadingBtn(true);
    updateGenre(props.genre.id, { ...data })
      .then((response) => {
        SuccessSnackbar('Cập thể loại thành công! Vui lòng tải lại trang.');
      })
      .finally(() => {
        setLoadingBtn(false);
        reset();
        props.setOpen(false);
      });
  };

  React.useEffect(() => {
    reset();
  }, [props.genre]);

  const handleClose = () => {
    reset();
    props.setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        maxWidth="xs"
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
          Cập Nhật Thể Loại
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
          <form id="form-add-genre" onSubmit={handleSubmit(save)}>
            <Box sx={{ width: '100%', mb: 2 }}>
              <Controller
                name="name"
                control={control}
                defaultValue={props.genre.name}
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <TextField
                    label={'Tên thể loại'}
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
            </Box>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="select-label">Loại</InputLabel>
              <Controller
                name="type"
                control={control}
                defaultValue={Number(props.genre.type)}
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
                    label="Loại"
                  >
                    <MenuItem value={TypeItem.Comics}>Truyện</MenuItem>
                    <MenuItem value={TypeItem.Movies}>Phim</MenuItem>
                    <MenuItem value={TypeItem.Music}>Nhạc</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={loadingBtn}
            type="submit"
            form="form-add-genre"
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

export default EditGenreDialog;