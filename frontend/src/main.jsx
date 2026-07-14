import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import router from "./routes/AppRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);