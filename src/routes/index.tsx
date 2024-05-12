import React from "react";
import {
    createBrowserRouter,
} from "react-router-dom";
import Interview from "./Interview"


export default createBrowserRouter([
    {
        path: "/",
        element: <Interview />,
    },
]);