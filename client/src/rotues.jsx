import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Messenger from "./pages/Messenger";
import React from "react";
import Login from "./components/Login";
import HomePage from "./pages/HomePage";
import Register from "./components/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage /> },
            {path: "login", element: <Login /> },
            {path: "register", element: <Register /> },
            {path: "messenger", element: <Messenger /> },
        ]
    }
]);

export default router