import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { NavBar } from '../navbar/navbar';
import { getBlogPosts, deleteBlogPost } from '../fetches/blogpost';
import { Footer } from './footer'

export const AllPosts = () => {
    const user = parseInt(localStorage.getItem("userId"))
    const history = useHistory()
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

    const blogPostings = () => {
        getBlogPosts()
            .then((data) => {
                setPosts(data)
            })
    }



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
                                        <div className="box">
                                            <img className="img" src={"http://localhost:8000" + post.picture} onClick={() => { history.push(`/allposts/${post.id}`) }} />
                                            <h1 className="postLink content is-medium" onClick={() => { history.push(`/allposts/${post.id}`) }}>{post.title}</h1>
                                            <p className="content postName">{post.user?.user?.username}</p>
                                        </div>
                                    </div>
                                </>
                            })
                        }
                    </div>
                </section>
            </div>

            <Footer />
        </>
    )
}