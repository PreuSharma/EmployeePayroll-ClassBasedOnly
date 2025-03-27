import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from '../components/HomePage/HomePage';
import Registration from '../pages/Registration/Registration';
import Login from '../pages/login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';

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
                    path:'registration',
                    element:<Registration />
                },
                {
                    path:'dashboard',
                    element:<Dashboard />
                },
            ]
        }
    ]);
  return (
        <RouterProvider router={route} />
  )
}