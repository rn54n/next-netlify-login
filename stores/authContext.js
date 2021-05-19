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
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log("login event");
    });

    netlifyIdentity.on("logout", (user) => {
      setUser(null);
      netlifyIdentity.close();
      console.log("logout event");
    });

    // event listener for authReady
    netlifyIdentity.on("init", (user) => {
      setUser(user);
      setAuthReady(true);
      console.log("init event");
    });

    // init netlify identity connection
    netlifyIdentity.init();

    // unregister different eventlisteners
    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  const login = () => {
    // open modal
    netlifyIdentity.open();
  };

  const logout = () => {
    // logout user
    netlifyIdentity.logout();
  };

  const context = { user, login, logout, authReady };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
