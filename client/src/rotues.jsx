import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Messenger from "./pages/Messenger";
import React from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "/messenger", element: <Messenger /> }
        ]
    }
]);

export default router