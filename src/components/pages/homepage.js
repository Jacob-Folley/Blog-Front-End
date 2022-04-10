import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { NavBar } from '../navbar/navbar';
import { createBlogPost } from '../fetches/blogpost';


export const HomePage = () => {
    // VARIABLES
    const history = useHistory()
    const tagRef = useRef()
    let userTag = ''
    let userTags = []
    const user = parseInt(localStorage.getItem("userId"))

    // USESTATES
    const [form, updateForm] = useState({
        title: '',
        file: '',
        tags: [],
        summary: '',
        content: ''
    });
    const [tags, setTags] = useState([]);

    useEffect(
        () => {

        },
        []
    )

    // THIS FUNCTION CAPTURES ALL OF THE USER INPUTS AND PLACES THEM INTO THE FORM OBJECT BASED ON THEIR NAME
    const changeFormState = (domEvent) => {
        const copy = { ...form }
        copy[domEvent.target.name] = (domEvent.target.value)
        updateForm(copy)
    }

    // THIS FUNCTION CAPTURES WHAT THE USER IS TYPING IN FOR A TAG
    const captureTag = (domEvent) => {
        userTag = (domEvent.target.value)
    }

    // THIS FUNCTION TAKES THE USER INPUT THAT IS CAPTURED IN THE CAPTURETAG FUNCTION THEN SETS IT TO TAGS STATE AS AN ARRAY
    const addTag = (e) => {
        e.preventDefault()
        if (userTag.length > 0) {
            setTags(userTags => [...userTags, `${userTag}`])
            tagRef.current.value = ""
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <NavBar />
            <h1></h1>
            <div className="container box">
                <section className="section is-small">

                    <form>
                        {/* TITLE */}
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" name="title" placeholder="Title" value={form.title} onChange={changeFormState}></input>
                            </div>
                        </div>

                        <div className="columns is-gapless">
                            {/* FILE UPLOAD */}
                            <div className="file is-small is-primary column">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="picture" value={form.picture} onChange={changeFormState} />
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file…
                                        </span>
                                    </span>
                                    <span className="file-name">
                                        {form.picture}
                                    </span>
                                </label>
                            </div>

                            {/* ADD TAGS */}
                            <div className="control column is-2">
                                <input className="input is-small" ref={tagRef} id="tag" type="text" name="tags" placeholder="Tags" onChange={captureTag}></input>
                            </div>
                            <div>
                                <button className="button is-small column" type="submit" onClick={addTag}>add</button>
                            </div>
                        </div>

                        {/* PRINTS TAGS */}
                        <div className="columns is-gapless">
                            {
                                tags.map((tag) => {
                                    return <div className="column content is-small"><p>{tag}</p></div>
                                })
                            }
                        </div>
                        <div>
                            {/* SUMMARY INPUT */}
                            <textarea className="textarea is-small" name="summary" placeholder="Summary" rows="3" value={form.summary} onChange={changeFormState}></textarea>
                        </div>
                        <div>
                            {/* CONTENT INPUT */}
                            <textarea className="textarea is-small" name="content" placeholder="Content" rows="50" value={form.content} onChange={changeFormState}></textarea>
                        </div>
                        {/* BUTTON THAT POSTS FORM TO DJANGO DATABASE */}
                        <button className="button" type="submit" onClick={(e) => {
                            e.preventDefault();
                            const blogposting = {
                                title: form.title,
                                file: form.file,
                                tags: tags,
                                summary: form.summary,
                                content: form.content,
                                user: user
                            }
                            console.log(blogposting)

                            // CALL FETCH FOR CREATING BLOG POST OBJECT
                            createBlogPost(blogposting)
                                .then(() => history.push("/myposts"))
                        }}>Post</button>
                    </form>
                </section>
            </div>
        </>
    )
}