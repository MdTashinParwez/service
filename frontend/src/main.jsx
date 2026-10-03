import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import router from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  

  <AuthProvider>
    <NotificationProvider>
    <RouterProvider router={router} />
    <Toaster position="top-right" />
     </NotificationProvider>
  </AuthProvider>

);