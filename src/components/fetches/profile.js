export const getProfiles = () => {
    return fetch("http://localhost:8000/blogger", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
    })
      .then(response => response.json())
  }
  
  export const createProfile = (blogger) => {
    return fetch("http://localhost:8000/blogger", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(blogger)
    })
      .then(res => res.json())
  }
  
  export const getProfile = (bloggerId) => {
    return fetch(`http://localhost:8000/blogger/${bloggerId}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('lu_token')}`
      }
    }).then(res => res.json())
  }
  
  export const updateProfile = (blogger) => {
    return fetch(`http://localhost:8000/blogposts/${blogger.id}`, {
      method: "Put",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(blogger)
    })
  }
  
  export const deleteProfile = (bloggerId) => {
    return fetch(`http://localhost:8000/blogger/${bloggerId}`, {
      method: "Delete",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      },
    })
  }