import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import GlobalErrorDialog from './components/Dialog/GlobalErrorDialog';
import { useContext } from 'react';
import { GlobalContext } from './contexts/GlobalContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const content = useRoutes(router);
  const { gError } = useContext(GlobalContext);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
        {!gError.isError && <ToastContainer />}
        <GlobalErrorDialog />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
