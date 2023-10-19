import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const login = localStorage.getItem('login');

const getElement = (element: any) => {
  return login ? element : <Navigate to="/" replace />;
};

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

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: !login ? (
          <Login />
        ) : (
          <Navigate to="/dashboards/overview" replace />
        )
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
        element: getElement(<Crypto />)
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
        element: getElement(<ManageAccount />)
      },
      {
        path: 'comics',
        element: getElement(<ManageComic />)
      },
      {
        path: 'musics',
        element: getElement(<ManageMusic />)
      },
      {
        path: 'movies',
        element: getElement(<ManageMovie />)
      },
      {
        path: 'genres',
        element: getElement(<ManageGenres />)
      },
      {
        path: 'authors',
        element: getElement(<ManageAuthors />)
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
        element: getElement(<Info />)
      },
      {
        path: 'logout',
        element: getElement(<Logout />)
      }
    ]
  }
];

export default routes;
