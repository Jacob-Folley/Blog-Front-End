import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { NavBar } from '../navbar/navbar';
import { getBlogPost } from '../fetches/blogpost';
import { Footer } from './footer'

export const SinglePost = () => {
    const { postId } = useParams()
    const [post, setPost] = useState({})

    useEffect(
        () => {
            getBlogPost(postId).then((data) => {
                setPost(data)
            })
        },
        []
    )



    return (
        <>
            < NavBar />
            <section className="section is-small">
                <div className=" container">

                    <div className="columns is-centered">
                        <div className="column is-8">

                            <div className="columns is-centered">
                                <h1 className="content is-large"><b>{post.title}</b></h1>
                            </div>

                            <div className="columns is-centered">
                                <p className="content is-small">By: {post.user?.user?.username}</p>
                            </div>

                            <nav className="level is-mobile">
                                <div className="level-left likeShare">
                                    <a className="level-item">
                                        <span className="icon is-small has-text-link"><i className="fas fa-reply"></i></span>
                                    </a>
                                    <a className="level-item">
                                        <span className="icon is-small has-text-grey-lighter"><i className="fas fa-retweet"></i></span>
                                    </a>
                                    <a className="level-item">
                                        <span className="icon is-small has-text-grey-lighter"><i className="fas fa-heart"></i></span>
                                    </a>
                                </div>
                            </nav>

                            <div className="box">
                                <p className="content is-small"><b><i>Summary</i></b></p>
                                <p className="content is-small"><i>{post.summary}</i></p>
                            </div>
                            <div className="box">
                                <section className="section is-small">
                                    <div className="columns is-centered">
                                        <div className="column is-8">
                                            <img src={"http://localhost:8000" + post.picture} />
                                        </div>
                                    </div>
                                </section>
                            </div>

                        </div>
                    </div>

                    <div className="columns is-centered">
                        <div className=" box column is-8 is-centered">
                            <p className="content">{post.content}</p>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />

        </>
    )
}