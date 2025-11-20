import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "./App";
import CarsListPage from "./pages/CarsListPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import CarEditPage from "./pages/CarEditPage";
import NotFoundPage from "./pages/NotFoundPage";
import CarCreatePage from "./pages/CarCreatePage";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path:'cars', 
                element:<CarsListPage/>
            },
            {
                path:'cars/:id',
                element:<CarDetailsPage/>
            },
            {
                path:'cars/edit/:id',
                element:<CarEditPage/>
            },
            {
                path:'cars/create',
                element:<CarCreatePage/>
            },
            {
                path:'not-found',
                element:<NotFoundPage/>
            },

            {path: '*',element :<Navigate replace to="/not-found"/>}
        ]
    }
]

export const router = createBrowserRouter(routes);