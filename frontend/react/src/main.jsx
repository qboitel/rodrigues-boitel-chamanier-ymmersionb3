import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import "./index.css";
import ErrorPage from "./error-page.jsx";
import TShirts from "./components/TShirts.jsx";

const router = createBrowserRouter([
    { path: "/", element: <Root />, errorElement: ErrorPage,
        children: [
            {
                path: "t-shirts",
                element: <TShirts />,
            },
            {
                path: "pulls",
                element: <h1>Pulls</h1>,
            },
            {
                path: "pantalons",
                element: <h1>Pantalons</h1>,
            },
            {
                path: "shorts",
                element: <h1>Shorts</h1>,
            },
            {
                path: "vestes",
                element: <h1>Vestes</h1>,
            },
            {
                path: "panier",
                element: <h1>Panier</h1>,
            },
            {
                path: "search",
                element: <h1>Search</h1>,
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
