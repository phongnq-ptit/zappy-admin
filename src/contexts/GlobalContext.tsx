import { FC, useState, createContext } from 'react';
import { User, generateDefauleUser } from 'src/types/interfaces/User';

interface IError {
  isError: boolean;
  message: string;
}

type GlobalContext = {
  gError: IError;
  setGError: (isError: IError) => void;
  LoginUser: User;
  setLoginUser: (user: User) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GlobalContext = createContext<GlobalContext>({} as GlobalContext);

export const GlobalContextProvider: FC = ({ children }) => {
  const [gError, setGError] = useState({ isError: false, message: '' });

  const user = localStorage.getItem('user');
  const [LoginUser, setLoginUser] = useState<User>(
    user ? JSON.parse(user) : generateDefauleUser()
  );

  return (
    <GlobalContext.Provider
      value={{ gError, setGError, LoginUser, setLoginUser }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
