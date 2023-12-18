import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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
import { useTheme } from '@mui/material';
import _ from 'lodash';
import { EGenreTabs, useGenreStore } from './store';
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
  genreEdit: Genre;
}

const EditGenreDialog = (props: Props) => {
  const theme = useTheme();
  const { handleSubmit, control, reset } = useForm();
  const { updateGenre } = useGenreApi();
  const [loadingBtn, setLoadingBtn] = React.useState(false);
  const { genres, onChangeGenres, onChangeTabs } = useGenreStore();

  React.useEffect(() => {
    reset();
  }, [props.genreEdit]);

  const save = (data: INewGenre) => {
    setLoadingBtn(true);
    const _req = getDiff({ ...data }, props.genreEdit);
    updateGenre(props.genreEdit.id, _req)
      .then((response) => {
        SuccessSnackbar('Cập thể loại thành công!');
        if (_req?.type) {
          onChangeTabs(String(_req.type) as EGenreTabs);
        } else {
          onChangeGenres(
            genres.map((item) =>
              item.id === props.genreEdit.id
                ? { ...props.genreEdit, ...data, updatedAt: new Date() }
                : item
            )
          );
        }
      })
      .finally(() => {
        setLoadingBtn(false);
        reset();
        props.setOpen(false);
      });
  };

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
                defaultValue={props.genreEdit.name}
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
                defaultValue={Number(props.genreEdit.type)}
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
