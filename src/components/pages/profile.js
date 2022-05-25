import React, { useEffect, useState } from 'react';
import { useParms, useHistory } from 'react-router-dom';
import { NavBar } from '../navbar/navbar'
import { getProfile, getProfiles, createProfile, deleteProfile } from '../fetches/profile'
import { getBlogPosts, deleteBlogPost } from '../fetches/blogpost';

export const Profile = () => {
    const user = parseInt(localStorage.getItem("userId"))
    const history = useHistory()

    // const [profileInfo, setProfileInfo] = useState({})
    // const [profile, setProfile] = useState({})
    // const [profiles, setProfiles] = useState([])
    const [form, updateForm] = useState({
        picture: "",
        summary: '',
        user: user
    });

    // //Fetches all the profiles
    // useEffect(() => {
    //     getProfiles().then((data) => {setProfiles(data)})
    // },
    // [])

    // useEffect(() => {
    //     myProfile()
    // },
    // [])

    //   // Gets the user profile
    //   useEffect(() => {
    //     let checkProfile = profiles.find((number)=> {
    //         return number?.user?.id === user
    //     })
    //     console.log(checkProfile)
    //     setProfileInfo(checkProfile)
    // },
    //     [])

    const changeFormState = (domEvent) => {
        const copy = { ...form }
        copy[domEvent.target.name] = (domEvent.target.value)
        updateForm(copy)
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            const copy = { ...form }
            copy.picture = base64ImageString

            updateForm(copy)

            // Update a component state variable to the value of base64ImageString
        });
    }

    // //Function that fetches the profile
    // const myProfile = () => {
    //     getProfile(profileInfo?.id).then((data) => {
    //         setProfile(data)
    //     })
    // }


    // let checkProfile = profiles.find((number)=> {
    //     return number?.user?.id === user
    // })

    const [profile, setProfile] = useState({})
    const [profiles, setProfiles] = useState([])
    const [number, setNumber] = useState(0)
    const [posts, setPosts] = useState([])
    const [myposts, setMyPosts] = useState([])


    useEffect(() => {
        findProfile().then((data) => { setProfile(data) })
    },
        [number])

    useEffect(() => {
        getProfiles().then((data) => { setProfiles(data) })
    },
        [])

    useEffect(() => {
        setNumber(profiles.find((profile) => {
            return profile?.user?.id === user
        }))
    },
        [profiles])

    const findProfile = () => {
        return getProfile(number?.id)
    }

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
            { }
            {profile?.summary ?
                <>
                    <section className="section is-small">
                        <div className="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd is-multiline">
                            <div className="column is-one-fifth">
                                <div class="card">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                            <img src={"http://localhost:8000" + profile?.picture} />
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="media">
                                            <div class="media-content">
                                                <p class="title is-4">{profile?.user?.first_name + " " + profile?.user?.last_name}</p>
                                                <p class="subtitle is-6">{"@" + profile?.user?.username}</p>
                                            </div>
                                        </div>

                                        <div class="content">
                                            {profile?.summary}
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container">
                                <section className="section is-small">
                                    <div className="columns is-centered is-multiline">
                                        {
                                            myposts.map((post) => {
                                                return <>
                                                    <div className="column is-one-quarter content is-small is-mobile">
                                                        <div className="box">
                                                            <img className="img" src={"http://localhost:8000" + post.picture} onClick={() => { history.push(`/allposts/${post.id}`) }} />
                                                            <h1 className="postLink content is-medium" onClick={() => { history.push(`/allposts/${post.id}`) }}>{post.title}</h1>
                                                            <p></p>
                                                            <div className="columns is-centered">
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
                        </div>
                    </section>
                </>
                :
                <>
                    <h1>"Create a profile"</h1>
                    <form>
                        <input type="file" name="picture" onChange={createImageString}></input>
                        <textarea name="summary" onChange={changeFormState}></textarea>
                        <button type="submit" onClick={(e) => {
                            e.preventDefault();
                            const blogger = {
                                user: form.user,
                                picture: form.picture,
                                summary: form.summary
                            }
                            createProfile(blogger)
                                .then(findProfile())
                        }}>Create Profile</button>
                    </form>
                </>
            }

        </>
    )
}