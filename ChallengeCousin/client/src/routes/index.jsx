import { createBrowserRouter } from "react-router-dom";

import DetailPage from '../views/DetailPage'
import HomePage from '../views/HomePage'
import Layout from "../components/Layout";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";

export default createBrowserRouter([
    {
        path: "/", 
        element: <HomePage />,
        children: [
            {
                path: "/products/:id",
                element: <DetailPage />
            },
        ]
    },
    // {
    //     path: "/login",
    //     element: <LoginPage />
    // },
    // {
    //     path: "/register",
    //     element: <RegisterPage />
    // }
])