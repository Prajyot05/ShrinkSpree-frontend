import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import ShortenUrlPage from "./components/ShortenUrlPage";
import { Toaster } from "react-hot-toast";
import LandingPage from "./components/LandingPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./components/ErrorPage";

function App() {
  const hideHeaderFooter = location.pathname.startsWith("/s");
  return (
    <Router>
      {!hideHeaderFooter && <Navbar />}
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/s/:url" element={<ShortenUrlPage />} />

        <Route
          path="/register"
          element={
            <PrivateRoute publicPage={true}>
              <RegisterPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateRoute publicPage={true}>
              <LoginPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute publicPage={false}>
              <DashboardLayout />
            </PrivateRoute>
          }
        />
        <Route path="/error" element={<ErrorPage />} />
        <Route
          path="*"
          element={
            <ErrorPage message="We can't seem to find the page you're looking for" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
