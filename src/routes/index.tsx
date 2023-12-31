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
  lazy(() => import('src/content/pages/Main/Management/Movie'))
);
const AddMovie = Loader(
  lazy(() => import('src/content/pages/Main/Management/Movie/AddMovie'))
);
const EditMovie = Loader(
  lazy(() => import('src/content/pages/Main/Management/Movie/EditMovie'))
);
const ManageMusic = Loader(
  lazy(() => import('src/content/pages/Main/Management/Music'))
);
const AddMusic = Loader(
  lazy(() => import('src/content/pages/Main/Management/Music/AddMusic'))
);
const EditMusic = Loader(
  lazy(() => import('src/content/pages/Main/Management/Music/EditMusic'))
);
const ManageComic = Loader(
  lazy(() => import('src/content/pages/Main/Management/Comic'))
);
const AddComic = Loader(
  lazy(() => import('src/content/pages/Main/Management/Comic/AddComic'))
);
const EditComic = Loader(
  lazy(
    () =>
      import('src/content/pages/Main/Management/Comic/ComicDetail/EditComic')
  )
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
const EditPackage = Loader(
  lazy(() => import('src/content/pages/Main/Management/Package/EditPackage'))
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
        path: `${Pathname.comics}/add`,
        element: <AddComic />
      },
      {
        path: `${Pathname.comics}/:comicId`,
        element: <EditComic />
      },
      {
        path: Pathname.musics,
        element: <ManageMusic />
      },
      {
        path: `${Pathname.musics}/add`,
        element: <AddMusic />
      },
      {
        path: `${Pathname.musics}/:musicId`,
        element: <EditMusic />
      },
      {
        path: Pathname.movies,
        element: <ManageMovie />
      },
      {
        path: `${Pathname.movies}/add`,
        element: <AddMovie />
      },
      {
        path: `${Pathname.movies}/:movieId`,
        element: <EditMovie />
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
        path: `${Pathname.package}/:packageId`,
        element: <EditPackage />
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
