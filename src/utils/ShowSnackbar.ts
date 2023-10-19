import { toast } from 'react-toastify';

export const SuccessSnackbar = (message: string) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT
  });
};

export const ErrorSnackbar = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT
  });
};

export const WarningSnackbar = (message: string) => {
  toast.warning(message, {
    position: toast.POSITION.TOP_RIGHT
  });
};
