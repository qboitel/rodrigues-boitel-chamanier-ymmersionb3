import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import ErrorPage from "./error-page.jsx";
import TShirts from "./components/TShirts.jsx";
import ProduitDetails from "./components/ProduitDetails.jsx";
import Home from "./components/Home.jsx";
import Pulls from "./components/Pulls.jsx";
import Pantalons from "./components/Pantalons.jsx";
import Short from "./components/Shorts.jsx";
import Vestes from "./components/Vestes.jsx";

const router = createBrowserRouter([
    { path: "/", element: <Root />, errorElement: ErrorPage,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "produits/:id",
                element: <ProduitDetails />,
            },
            {
                path: "t-shirts",
                element: <TShirts />,
            },
            {
                path: "pulls",
                element: <Pulls />,
            },
            {
                path: "pantalons",
                element: <Pantalons />,
            },
            {
                path: "shorts",
                element: <Short />,
            },
            {
                path: "vestes",
                element: <Vestes />,
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
