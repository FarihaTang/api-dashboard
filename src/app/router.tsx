import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import UserPage from "../features/users/pages/UserPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Navigate to="/users" replace />,
      },
      {
        path: "users",
        element: <UserPage />,
      },
    ]
  },
  // 404 单独处理
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
])