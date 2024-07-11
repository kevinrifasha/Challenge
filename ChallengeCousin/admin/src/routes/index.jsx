import { createBrowserRouter, redirect } from "react-router-dom"

import LoginPage from "../views/LoginPage"
import ProductPage from "../views/ProductPage"
import CategoryPage from "../views/CategoryPage"
import AddProductPage from "../views/AddProductPage"
import AddCategoryPage from "../views/AddCategoryPage"
import Layout from "../components/Layout"
import AddAdminPage from "../views/AddAdminPage"

export default createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        loader: () => localStorage.access_token ? null : redirect("/login"),
        children:[
            {
                index: true,
                element: <ProductPage />
            },
            {
                path: "/categories",
                element: <CategoryPage />,
            },
            {
                path: "/product-add",
                element: <AddProductPage />
            },
            {
                path: "/categories/add",
                element: <AddCategoryPage />
            },
            {
                path: "/edit/:id",
                element: <AddProductPage />
            },
            {
                path: "/admin",
                element: <AddAdminPage />
            },
            {
                path: "categories/:id",
                element: <AddCategoryPage />
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    }
    
])