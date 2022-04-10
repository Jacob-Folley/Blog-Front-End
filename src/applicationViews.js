import React from "react";
import { Route } from "react-router-dom";
import { HomePage } from "./components/pages/homepage"
import { MyPosts } from "./components/pages/myposts"
import { AllPosts } from "./components/pages/allposts"



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

            <Route exact path="/myposts">
                <MyPosts />
            </Route>

            <Route exact path="/allposts">
                <AllPosts />
            </Route>
        
        </>
    )


}

export default ApplicationViews