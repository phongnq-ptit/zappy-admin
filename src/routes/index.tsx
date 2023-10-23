import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { Pathname } from './path';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Dashboards
const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications
const ManageAccount = Loader(
  lazy(() => import('src/content/pages/Main/Management/ManageAccount'))
);
const ManageMovie = Loader(
  lazy(() => import('src/content/pages/Main/Management/ManageMovie'))
);
const ManageMusic = Loader(
  lazy(() => import('src/content/pages/Main/Management/ManageMusic'))
);
const ManageComic = Loader(
  lazy(() => import('src/content/pages/Main/Management/ManageComic'))
);
const ManageAuthors = Loader(
  lazy(() => import('src/content/pages/Main/Management/ManageAuthors'))
);
const ManageGenres = Loader(
  lazy(() => import('src/content/pages/Main/Management/ManageGenres'))
);

const Login = Loader(
  lazy(() => import('src/content/pages/Main/Account/Login'))
);
const Logout = Loader(
  lazy(() => import('src/content/pages/Main/Account/Logout'))
);
const Info = Loader(
  lazy(() => import('src/content/pages/Main/Account/Infomation'))
);

// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);

//tmp
const TMP = Loader(lazy(() => import('src/content/applications/Transactions')));

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: 'login',
        element: <Navigate to="/" replace />
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="overview" replace />
      },
      {
        path: Pathname.overview,
        element: <Crypto />
      },
      {
        path: Pathname.users,
        element: <ManageAccount />
      },
      {
        path: Pathname.comics,
        element: <ManageComic />
      },
      {
        path: Pathname.musics,
        element: <ManageMusic />
      },
      {
        path: Pathname.movies,
        element: <ManageMovie />
      },
      {
        path: Pathname.genres,
        element: <ManageGenres />
      },
      {
        path: Pathname.authors,
        element: <ManageAuthors />
      },
      {
        path: Pathname.infomation,
        element: <Info />
      },
      {
        path: 'logout',
        element: <TMP />
        // element: <Logout />
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  }
];

export default routes;
