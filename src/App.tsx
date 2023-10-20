import { useNavigate, useRoutes } from 'react-router-dom';
import router from 'src/routes';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import GlobalErrorDialog from './components/Dialog/GlobalErrorDialog';
import { useContext, useEffect } from 'react';
import { GlobalContext } from './contexts/GlobalContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pathname } from './routes/path';

function App() {
  const content = useRoutes(router);
  const navigate = useNavigate();
  const { gError } = useContext(GlobalContext);
  const isLogged = localStorage.getItem('login');

  useEffect(() => {
    if (
      isLogged &&
      !Object.values(Pathname).some((value) =>
        window.location.pathname.includes(`${value}`)
      )
    ) {
      navigate(Pathname.overview);
    }
    if (!isLogged) {
      navigate('/');
    }
  }, [isLogged]);

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
