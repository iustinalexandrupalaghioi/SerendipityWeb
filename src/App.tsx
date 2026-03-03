import { Route, Routes } from "react-router";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import SignupSuccess from "./pages/Auth/SignupSuccess";
import UpdatePassword from "./pages/Auth/UpdatePassword";
import ErrorPage from "./pages/Error";
import Layout from "./pages/Layout";
import ProtectedRoute from "./pages/Protected/ProtectedRoute";
import UserProfile from "./pages/Auth/UserProfile";
import LandingPage from "./pages/Client/LandingPage";
import AboutPage from "./pages/Client/AboutPage";
import ServicesPage from "./pages/Client/ServicesPage";
import CoursesPage from "./pages/Client/CoursesPage";
import CourseDetailsPage from "./pages/Client/CourseDetailsPage";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/error" element={<ErrorPage />} />
      <Route path="auth/login" element={<Login />} />
      <Route path="auth/signup" element={<Signup />} />
      <Route path="auth/signup-success" element={<SignupSuccess />} />
      <Route path="auth/forgot-password" element={<ForgotPassword />} />
      <Route path="auth/update-password" element={<UpdatePassword />} />

      {/* Protected Routes */}

      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />
        <Route element={<ProtectedRoute />}>
          {/* Default authenticated route */}
          <Route path="/profile/:tab" element={<UserProfile />} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
