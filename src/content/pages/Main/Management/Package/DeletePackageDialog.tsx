import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import React, { useEffect } from 'react';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  onAction: () => void;
  loading: boolean;
}

const DeletePackageDialog = ({ open, setOpen, onAction, loading }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 700 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            color: 'inherit'
          }}
        >
          <span>Vui lòng xác nhận!</span>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bạn có chắc muốn xóa gói ưu đãi này không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            textDecoration: 'underline'
          }}
          color="secondary"
          onClick={handleClose}
        >
          Đóng
        </Button>
        <LoadingButton
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            textDecoration: 'underline'
          }}
          loading={loading}
          color="error"
          autoFocus
          onClick={onAction}
        >
          <span>Xóa Gói Ưu Đãi</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePackageDialog;
