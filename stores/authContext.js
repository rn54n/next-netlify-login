// keep track of authenticated users

import { createContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

// component to wrap provider
export const AuthContextProvider = ({ children }) => {
  // keep track of current user with state hook
  // user is not logged in
  const [user, setUser] = useState(null);

  useEffect(() => {
    // init netlify identity connection
    netlifyIdentity.init();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthContext;
