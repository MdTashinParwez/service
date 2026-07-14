import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import SignupPage from "../pages/Signup/SignupPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import ServicePage from "../pages/Services/ServicePage";
import AboutPage from "../pages/About/AboutPage";
import ProviderPage from "../pages/Provider/ProviderPage"
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "login",
        element: <LoginPage />,
      },

      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path:"services",
        element:<ServicePage />
      },
      {
        path:"about",
        element: <AboutPage/>
      },
      {
        path: "provider",
        element:<ProviderPage/>
      },
    ],
  },
]);

export default router;