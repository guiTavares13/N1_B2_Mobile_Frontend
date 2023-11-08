import { createContext } from 'react';

const UserContext = createContext({
    userContext: {},
    setUserContext: () => {},
  });

export default UserContext;
