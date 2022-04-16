import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';


export const NavBar = () => {
    const history = useHistory()


    return (
        <>


            <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://www.arborday.org/trees/treefacts/">
                        <img src="https://pngimg.com/uploads/tree/tree_PNG92760.png" />
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/allposts">Home</Link>
                        <Link className="navbar-item" to="/myposts">My Posts</Link>
                        <Link className="navbar-item" to="/profile">Profile</Link>
                    </div>

                    <div className="navbar-end">
                        <Link className="navbar-item" to="/"><img src="https://img.icons8.com/officel/452/create-new.png" /></Link>
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                <img src="https://static.wixstatic.com/media/2cd43b_517ff0ef930e453cb4c30d288375640c~mv2.png/v1/fit/w_990,h_990,q_90/2cd43b_517ff0ef930e453cb4c30d288375640c~mv2.webp" />
                            </a>

                            <div className="navbar-dropdown">
                                <div className="buttons">
                                    <a className="button is-primary">
                                        <strong>Theme</strong>
                                    </a>
                                    <a className="button is-light" onClick={()=>{
                                        localStorage.clear()
                                        history.push("/")
                                    }}>
                                        Log out
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="navbar-item">
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}