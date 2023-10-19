import React, { useContext, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { GlobalContext } from 'src/contexts/GlobalContext';

const GlobalErrorDialog = () => {
  const { gError, setGError } = useContext(GlobalContext);

  const handleClose = () => {
    setGError({ isError: false, message: '' });
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  useEffect(() => {
    if (gError.isError) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [gError.isError]);

  return (
    <Dialog
      open={gError.isError}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
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
          <InfoIcon /> <span>Vui lòng thử lại!</span>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {gError.message}
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
      </DialogActions>
    </Dialog>
  );
};

export default GlobalErrorDialog;
