import React, { createContext, useState, useEffect } from 'react';
import { auth, generateUserDocument } from '../firebase';

export const UserContext = createContext(null);

const UserProvider: React.FC = (props) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth);
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
