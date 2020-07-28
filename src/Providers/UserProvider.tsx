import React, { createContext, useState, useEffect } from 'react';
import { auth, generateUserDocument } from '../firebase';

export const UserContext = createContext({
  loading: true,
  user: null,
});

const UserProvider: React.FC = props => {
  const [user, setUser] = useState<any>({
    loading: true,
    user: null,
  });

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      setUser({
        loading: false,
        user,
      });
    });
  }, []);

  return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>;
};

export default UserProvider;
