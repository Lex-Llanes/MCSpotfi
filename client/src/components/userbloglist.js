import { React, useState, useEffect } from 'react'

const UserBlogList = (props) => {
    const [blogUser, setBlogUser] = useState("");
    const [blogList, setBlogList] = useState([]);

    const getUsersBlog = async () => {
        try {
            const blogList = await fetch(`http://loccalhost:3001/bloglist/?userName${blogUser}`)
        } catch (error) {
            console.error(error.message)
        }
    }


    useEffect(() => {
        getUsersBlog()
    },[blogUser])


  return (
    <div>
        {blogUser.map(details => (
            <div>
                <p>Username: {details.username}</p>
                <p>Title: {details.blog_title}</p>
                <p>Category: {details.blog_category}</p>
                <p>Genre: {details.blog_search}</p>
                <p>Content: {details.blog_content}</p>
                <p>Privacy: {details.blog_privacy}</p>
                <p>Date/Time: {details.date} {details.time}</p>
            </div>
        ))}
    </div>
  )
}

export default UserBlogList;