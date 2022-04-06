import React, { StrictMode } from "react";
import { Route, Redirect, createRoot } from "react-router-dom";
import ApplicationViews from "./applicationViews";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register.js";


export const Application = () => {
    return (
    <>
        <Route
            render={() => {
                if (localStorage.getItem("lu_token")) {
                    return (
                        <>
                            <ApplicationViews />
                        </>
                    );
                } else {
                    return <Redirect to="/login" />;
                }
            }}
            />

        <Route path="/login">
            <Login />
        </Route>

        <Route path="/register">
            <Register />
        </Route>
    
    </>
    )
}