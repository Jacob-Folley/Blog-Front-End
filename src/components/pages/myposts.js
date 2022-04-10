import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { NavBar } from '../navbar/navbar';
import { getBlogPosts } from '../fetches/blogpost';

export const MyPosts = () => {
    const user = parseInt(localStorage.getItem("userId"))
    const [posts, setPosts] = useState([])
    const [myposts, setMyPosts] = useState([])

    useEffect(
        () => {
            getBlogPosts()
                .then((data) => {
                    setPosts(data)
                })
        },
        []
    )

    useEffect(
        () => {
            setMyPosts(posts.filter((post) => {
                return post.user.id == user
            })
            )
        },
        [posts]
    )



    return (
        <>
            <NavBar />
            <div className="container">
                <section className="section is-small">
                    <div className="columns is-centered is-multiline">
                        {
                            myposts.map((post) => {
                                return <>
                                    <div className="column is-one-quarter content is-small is-mobile">
                                        <div className="box">
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