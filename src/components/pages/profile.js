import React, { useEffect, useState } from 'react';
import { useParms, useHistory } from 'react-router-dom';
import { NavBar } from '../navbar/navbar'
import { getProfile, createProfile } from '../fetches/profile'

export const Profile = () => {
    const user = parseInt(localStorage.getItem("userId"))
    const history = useHistory()

    const [profileInfo, setProfileInfo] = useState({})
    const [form, updateForm] = useState({
        picture: {},
        summary: '',
        user: user
    });

    useEffect(() => {
        getProfileInformation()
    },
        [])

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

    const getProfileInformation = () => {
        getProfile(user).then((data) => {
            setProfileInfo(data)
        })
    }
    return (
        <>
            <NavBar />

            {profileInfo.summary ? <h1>"Profile is there"</h1>
                :
                <>
                    <h1>"Create a profile"</h1>
                    <form>
                        <input type="file" name="picture" onChange={createImageString}></input>
                        <textarea name="summary" onChange={changeFormState}></textarea>
                        <button type="submit" onClick={(e)=>{
                            e.preventDefault();
                            const blogger = {
                                user: form.user,
                                picture: form.picture,
                                summary: form.summary
                            }
                            createProfile(blogger)
                            .then(getProfileInformation())
                        }}>Create Profile</button>
                    </form>
                </>
            }

        </>
    )
}