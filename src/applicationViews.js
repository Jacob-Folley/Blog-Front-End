import React from "react";
import { Route } from "react-router-dom";
import { HomePage } from "./components/pages/homepage"



const ApplicationViews = () => {
    // VARIABLES
    //----------------------------------------------------------------


    // USE STATES
    //----------------------------------------------------------------


    // USE EFFECTS
    //----------------------------------------------------------------

    return (
        <>
            <Route exact path="/">
                <HomePage />
            </Route>
        
        </>
    )


}

export default ApplicationViews