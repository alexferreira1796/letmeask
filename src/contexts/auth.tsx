import React from 'react';
import { firebase, auth } from '../services/firebase.connection';

type UserType = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: UserType | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: React.ReactNode;
}

export const AuthContext = React.createContext({} as AuthContextType);

function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = React.useState<UserType>();

  // Recuperando o estado de autenticação
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, photoURL, uid } = user;
        if(!displayName || !photoURL) {
          throw new Error('Missing information form Google Account');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const res = await auth.signInWithPopup(provider);

    if(res.user) {
      const { displayName, photoURL, uid } = res.user;

      if(!displayName || !photoURL) {
        throw new Error('Missing information form Google Account');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;