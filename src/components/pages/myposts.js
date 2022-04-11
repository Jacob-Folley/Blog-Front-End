import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { NavBar } from '../navbar/navbar';
import { getBlogPosts, deleteBlogPost } from '../fetches/blogpost';

export const MyPosts = () => {
    const user = parseInt(localStorage.getItem("userId"))
    const [posts, setPosts] = useState([])
    const [myposts, setMyPosts] = useState([])

    useEffect(
        () => {
            blogPostings()
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

    const blogPostings = () => {
        getBlogPosts()
            .then((data) => {
                setPosts(data)
            })
    }


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
                                            <img src={"http://localhost:8000" + post.picture} />
                                            <p></p>
                                            <div className="columns">
                                                <button type="submit" className="button is-small is-danger is-light" onClick={(e) => {
                                                    e.preventDefault()
                                                    deleteBlogPost(post.id).then(blogPostings)
                                                }}>Delete</button>
                                                <button className="button is-small is-info is-light">Edit</button>
                                            </div>
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