import { ReactNode, createContext, useContext } from 'react';
import { useQuery } from 'react-query';

interface LoginRes {
  jwt: string;
  username: string;
  id: string;
}

type UserContext = {
  currUser?: LoginRes;
  refetchCurrUser: () => void;
};

export enum LOCALS {
  CURR_USER = 'currUser',
}

const isLoggedIn = (): boolean => {
  return !!localStorage.getItem(LOCALS.CURR_USER);
};

export const AuthContext = createContext({} as UserContext);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const key = ['getCurrUser'];
  const queryFn = () => {
    const currUser = JSON.parse(localStorage.getItem(LOCALS.CURR_USER) || '{}');
    return currUser as LoginRes;
  };

  const { data: currUser, refetch: refetchCurrUser } = useQuery(key, queryFn, {
    enabled: isLoggedIn(),
    refetchOnWindowFocus: false,
  });

  return (
    <AuthContext.Provider value={{ currUser, refetchCurrUser }}>{children}</AuthContext.Provider>
  );
};
