import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  
 <ThemeProvider>
  <AuthProvider>
    <NotificationProvider>
    <RouterProvider router={router} />
     </NotificationProvider>
  </AuthProvider>
</ThemeProvider>
);