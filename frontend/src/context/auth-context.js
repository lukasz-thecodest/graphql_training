import React from "react";

export default React.createContext({
  token: null,
  userId: null,
  tokenExpiration: null,
  login: () => {},
  logout: () => {},
});
