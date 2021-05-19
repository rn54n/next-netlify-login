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
const AuthContextProvider = ({ children }) => {
  // keep track of current user with state hook
  // user is not logged in
  const [user, setUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log("login event");
    });

    // init netlify identity connection
    netlifyIdentity.init();
  }, []);

  const login = () => {
    // open modal
    netlifyIdentity.open();
  };

  const context = { user, login };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
