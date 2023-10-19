import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { GlobalContextProvider } from 'src/contexts/GlobalContext';

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <GlobalContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalContextProvider>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
