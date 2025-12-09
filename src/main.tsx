import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import TwinDetailPage from "./pages/TwinDetailPage";
import AuthorDetail from "./pages/AuthorDetail";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "chat", element: <Chat /> },
      { path:"/twin/:slug", element:<TwinDetailPage/> },
      { path:"/author/:name", element:<AuthorDetail /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
