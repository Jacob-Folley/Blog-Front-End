import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { NavBar } from '../navbar/navbar';
import { getBlogPost } from '../fetches/blogpost';

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
                                <p className="content is-small">By: {post.user?.username}</p>
                            </div>

                            <div class="box">
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


        </>
    )
}