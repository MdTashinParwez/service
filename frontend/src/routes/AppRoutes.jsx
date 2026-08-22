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
import BecomeProviderPage from "../pages/BecomeProvider/BecomeProviderPage";
import BookingPage from "../pages/Booking/BookingPage";
import BookingSuccessPage from "../pages/Booking/BookingSuccessPage";
import ServiceDetailsPage from "../pages/services/ServiceDetailsPage";
import MyBookingsPage from "../pages/Booking/MyBookingsPage";
import BookingDetailsPage from "../pages/Booking/BookingDetailsPage";
import ProtectedRoute from "./protecdRoute";
import ProviderDashboard from "../pages/Dashboard/ProviderDashboard";
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
      // {
      //   path:"services",
      //   element:<ServicesPage />
      // },
      {
        path: "services",
        children: [
                    {
                      index: true,
                      element: <ServicesPage />,
                    },
                    {
                      path: ":serviceId",
                      element: <ServiceDetailsPage />,
                    },
                   ],
      },
      {
        path:"about",
        element: <AboutPage/>
      },
      
      
      {
        path: "provider",
        element:<ProviderPage/>
      },
     
      {
        path: "provider/:providerId",
        element: <ProviderPage />,
      },
      {
      path:"providers",
      element:<ProvidersPage/>
      },
      {
      path: "become-provider",
      element:
        <ProtectedRoute>
       <BecomeProviderPage/>
       </ProtectedRoute>
      },
      {
      path: "booking/:serviceId",
      element: <BookingPage />,
      },
      {
      path: "booking/success",
      element: <BookingSuccessPage />,
      },
      {
      path: "bookings",
      element: <MyBookingsPage />,
      },
      {
      path: "bookings/:bookingId",
      element: <BookingDetailsPage/>,
      },
       {
        path: "provider/dashboard",
        element: (
          <ProtectedRoute>
            <ProviderDashboard />
          </ProtectedRoute>
        )
      },
    



    ],
  },
]);

export default router;
