import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { GlobalContext } from 'src/contexts/GlobalContext';
import { User } from 'src/types/interfaces/User';

const Logout = () => {
  const navigate = useNavigate();
  const { setLoginUser } = useContext(GlobalContext);

  useEffect(() => {
    localStorage.removeItem('login');
    localStorage.removeItem('user');
    setLoginUser({} as User);
    navigate('/');
  }, []);
  return <></>;
};

export default Logout;
