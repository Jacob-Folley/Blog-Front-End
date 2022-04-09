export const getBlogPosts = () => {
    return fetch("http://localhost:8000/blogposts", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
    })
      .then(response => response.json())
  }
  
  export const createBlogPost = (blogpost) => {
    return fetch("http://localhost:8000/blogposts", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(blogpost)
    })
      .then(res => res.json())
  }
  
  export const getBlogPost = (blogpostId) => {
    return fetch(`http://localhost:8000/blogposts/${blogpostId}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('lu_token')}`
      }
    }).then(res => res.json())
  }
  
  export const updateBlogPost = (blogpost) => {
    return fetch(`http://localhost:8000/blogposts/${blogpost.id}`, {
      method: "Put",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(blogpost)
    })
  }
  
  export const deleteBlogPost = (blogpostId) => {
    return fetch(`http://localhost:8000/blogposts/${blogpostId}`, {
      method: "Delete",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      },
    })
  }