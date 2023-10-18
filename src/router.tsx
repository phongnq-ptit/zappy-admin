import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const Overview = Loader(lazy(() => import('src/content/overview')));

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
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="overview" replace />
      },
      {
        path: 'overview',
        element: <Crypto />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="users" replace />
      },
      {
        path: 'users',
        element: <ManageAccount />
      },
      {
        path: 'comics',
        element: <ManageComic />
      },
      {
        path: 'musics',
        element: <ManageMusic />
      },
      {
        path: 'movies',
        element: <ManageMovie />
      }
    ]
  },
  {
    path: 'account',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="infomation" replace />
      },
      {
        path: 'infomation',
        element: <Info />
      },
      {
        path: 'logout',
        element: <Logout />
      }
    ]
  }
];

export default routes;
