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
import { INewGenre } from 'src/types/interfaces/Genre';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { TypeItem } from 'src/types/enums/TypeItem';

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
}

const AddNewGenreDialog = (props: Props) => {
  const theme = useTheme();
  const { handleSubmit, control, reset } = useForm();

  const save = (data: INewGenre) => {
    console.log(data);
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
        maxWidth="md"
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
          Thêm thể loại mới
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
              <FormInput
                name="name"
                label="Tên Thể loại"
                control={control}
                defaultValue={''}
                rules={{
                  required: 'Không được để trống!'
                }}
              />
            </Box>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="select-label">Loại</InputLabel>
              <Controller
                name="type"
                control={control}
                defaultValue={TypeItem.Comics}
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
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            form="form-add-genre"
            variant="outlined"
            autoFocus
          >
            Thêm mới
          </Button>
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

export default AddNewGenreDialog;
