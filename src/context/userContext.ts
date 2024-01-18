import { createContext } from 'react';

type TUserContext = { user: User | null; setUser: SetState<User | null> };
export const UserContext = createContext({} as TUserContext);
