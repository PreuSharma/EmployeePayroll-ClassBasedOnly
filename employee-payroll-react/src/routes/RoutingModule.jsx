import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from '../components/HomePage/HomePage';
import DashboardContainer from '../pages/DashboardContainer';
import Registration from '../pages/Registration/Registration';
import Login from '../pages/login/Login';

export default function RoutingModule() {

    const route = createBrowserRouter([
        {path:'/',
            element: (
                <Login/>
            ),
        },
        {
            path:'homePage',
            element: (
                <HomePage/>
            ),
            children:[
                {
                    path:'dashboard',
                    element:<DashboardContainer />
                },
                {
                    path:'registration',
                    element:<Registration />
                },
            ]
        }
    ]);
  return (
        <RouterProvider router={route} />
  )
}