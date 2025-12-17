import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import TwinDetailPage from "./pages/TwinDetailPage";
import AuthorDetail from "./pages/AuthorDetail";
import AuthorChat from "./pages/AuthorChat";
import Marketplace from "./pages/Marketplace";
import Twin from "./pages/Twin";


const router = createBrowserRouter([
 {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "author/:authorSlug", element: <Home key="author" /> },   
      { path: "chat", element: <Chat /> },
      { path: "twin/:slug", element: <TwinDetailPage /> },
      { path: "authors/:authorSlug", element: <AuthorDetail /> }, 
      { path: "authors/:authorSlug/chat", element: <AuthorChat /> },   
      { path: "marketplace", element: <Marketplace /> },  
      { path: "/twins/:id", element: <Twin /> },  
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
