import { Route, Routes } from "react-router";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import SignupSuccess from "./pages/Auth/SignupSuccess";
import UpdatePassword from "./pages/Auth/UpdatePassword";
import UserProfile from "./pages/Auth/UserProfile";
import AboutPage from "./pages/Client/AboutPage";
import CourseDetailsPage from "./pages/Client/CourseDetailsPage";
import CoursesPage from "./pages/Client/CoursesPage";
import LandingPage from "./pages/Client/LandingPage";
import ServicesPage from "./pages/Client/ServicesPage";
import ErrorPage from "./pages/Error";
import Layout from "./pages/Layout";
import ProtectedRoute from "./pages/Protected/ProtectedRoute";
import TermsAndConditions from "./pages/Legal/TermsAndconditions";
import CookiePolicy from "./pages/Legal/CookiePolicy";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/error" element={<ErrorPage />} />

      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/signup" element={<Signup />} />
        <Route path="auth/signup-success" element={<SignupSuccess />} />
        <Route path="auth/forgot-password" element={<ForgotPassword />} />
        <Route path="auth/update-password" element={<UpdatePassword />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="cookie-policy" element={<CookiePolicy />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
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
