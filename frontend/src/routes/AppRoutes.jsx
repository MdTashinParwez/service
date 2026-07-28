import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import SignupPage from "../pages/Signup/SignupPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import ServicesPage from "../pages/services/ServicesPage";
import AboutPage from "../pages/About/AboutPage";
import ProviderPage from "../pages/Provider/ProviderPage"
import ProvidersPage from "../pages/Provider/ProvidersPage";

// import ServiceDetailsPage from "../pages/services/ServiceDetailsPage";
// import ProviderPage from "../pages/Provider/ProviderPage";
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
        element:<ServicesPage />
      },
      {
        path:"about",
        element: <AboutPage/>
      },
      {
        path: "provider",
        element:<ProviderPage/>
      },
      // {
      //   path:"/services/:serviceId",
      //   element: <ServiceDetailsPage/>
      // }
      {
        path: "provider/:providerId",
        element: <ProviderPage />,
      },
      {
      path:"providers",
      element:<ProvidersPage/>
      },

    ],
  },
]);

export default router;
