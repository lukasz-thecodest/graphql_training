import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";
import MainNavigation from "./components/Navigation/MainNavigation";
import AuthContext from "./context/auth-context";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
    setTokenExpiration(tokenExpiration);
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
    setTokenExpiration(null);
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          token: token,
          userId: userId,
          tokenExpiration: tokenExpiration,
          login: login,
          logout: logout,
        }}
      >
        <MainNavigation />
        <main className={"main__content"}>
          <Routes>
            {!token && <Route path="/" element={<Navigate to="/auth" />} />}
            {!token && (
              <Route path="bookings" element={<Navigate to="/auth" />} />
            )}
            {!token && <Route path="auth" element={<AuthPage />} />}

            {token && <Route path="/" element={<Navigate to="/events" />} />}
            {token && <Route path="auth" element={<Navigate to="/events" />} />}
            {token && <Route path="bookings" element={<BookingsPage />} />}

            <Route path="events" element={<EventsPage />} />
          </Routes>
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
