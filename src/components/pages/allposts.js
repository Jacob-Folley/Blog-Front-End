import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { NavBar } from '../navbar/navbar';
import { getBlogPosts } from '../fetches/blogpost';

export const AllPosts = () => {
    const user = parseInt(localStorage.getItem("userId"))
    const [posts, setPosts] = useState([])

    useEffect(
        () => {
            getBlogPosts()
                .then((data) => {
                    setPosts(data)
                })
        },
        []
    )



    return (
        <>
            <NavBar />
            <section className="section is-small">
                <div className="columns is-centered">
                    <input className="input column is-4 is-small" type="text" placeholder="search" />
                    <button className="button is-small" type="submit">search</button>
                </div>
            </section>
            <div className="container">
                <section className="section is-small">
                    <div className="columns is-centered is-multiline">
                        {
                            posts.map((post) => {
                                return <>
                                    <div className="column is-one-quarter content is-small is-mobile">
                                        <div className="box colorHover">
                                            <h1>{post.title}</h1>
                                            <p>{post.summary}</p>
                                        </div>
                                    </div>
                                </>
                            })
                        }
                    </div>
                </section>
            </div>
        </>
    )
}