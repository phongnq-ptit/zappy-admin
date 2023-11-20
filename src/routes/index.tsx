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
  lazy(() => import('src/content/pages/Main/Management/Account'))
);
const AddNewAccount = Loader(
  lazy(() => import('src/content/pages/Main/Management/Account/AddNewAccount'))
);

const AccountDetail = Loader(
  lazy(() => import('src/content/pages/Main/Management/Account/AccountDetail'))
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
  lazy(() => import('src/content/pages/Main/Management/Author'))
);
const ManageGenres = Loader(
  lazy(() => import('src/content/pages/Main/Management/Genre'))
);
const ManagePackage = Loader(
  lazy(() => import('src/content/pages/Main/Management/Package'))
);
const AddPackage = Loader(
  lazy(() => import('src/content/pages/Main/Management/Package/AddPackage'))
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
        path: `${Pathname.users}/:userId`,
        element: <AccountDetail />
      },
      { path: `${Pathname.users}/add`, element: <AddNewAccount /> },
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
        path: Pathname.package,
        element: <ManagePackage />
      },
      {
        path: `${Pathname.package}/add`,
        element: <AddPackage />
      },
      {
        path: Pathname.infomation,
        element: <Info />
      },
      {
        path: 'logout',
        element: <Logout />
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  }
];

export default routes;
