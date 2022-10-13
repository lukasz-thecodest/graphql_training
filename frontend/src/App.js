import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" element={<AuthPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="/" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
