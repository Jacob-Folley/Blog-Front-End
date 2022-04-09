import React, {useEffect, useState, useRef} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { NavBar } from '../navbar/navbar';
import { createBlogPost } from '../fetches/blogpost';

export const HomePage = () => {
    // VARIABLES
    const tagRef = useRef()
    let userTag = ''
    let userTags = []

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
    
    return (
        <>
            <NavBar />
            <p></p>

            <form>
                <div>
                    {/* TITLE */}
                    <input type="text" name="title" placeholder="Title" value={form.title} onChange={changeFormState}></input>
                </div>
                    {/* FILE UPLOAD */}
                    <input type="file" name="picture" value={form.picture} onChange={changeFormState}></input>
                <div>
                    <div>
                        {/* ADD TAGS */}
                        <input ref={tagRef} id="tag" type="text" name="tags" placeholder="Tags" onChange={captureTag}></input>
                        <button type="submit" onClick={addTag}>add</button>
                    </div>
                    {/* PRINTS TAGS */}
                    {
                        tags.map((tag) => {
                            return <p>{tag}</p>
                        })
                    }
                </div>
                <div>
                    {/* SUMMARY INPUT */}
                    <textarea name="summary" placeholder="Summary" value={form.summary} onChange={changeFormState}></textarea>
                </div>
                <div>
                    {/* CONTENT INPUT */}
                    <textarea name="content" placeholder="Content" value={form.content} onChange={changeFormState}></textarea>
                </div>
                {/* BUTTON THAT POSTS FORM TO DJANGO DATABASE */}
                <button type="submit" onClick={(e)=>{
                    e.preventDefault();
                    const blogposting = {
                        title: form.title,
                        file: form.file,
                        tags: tags,
                        summary: form.summary,
                        content: form.content
                    }
                    console.log(blogposting)
                }}>Post</button>
            </form>
        </>
    )
}