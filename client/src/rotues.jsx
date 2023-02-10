import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Messenger from "./pages/Messenger";
import React from "react";
import Login from "./components/Login";
import HomePage from "./pages/HomePage";
import Register from "./components/Register";
import PrivateRoute from "./middleware/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "", element: <HomePage/>},
            {path: "login", element: <Login/>},
            {path: "register", element: <Register/>},
            {path: "messenger/:friendId", element: <PrivateRoute><Messenger/></PrivateRoute>},
            {path: "messenger", element: <PrivateRoute><Messenger/></PrivateRoute>},
        ]
    }
]);

export default router