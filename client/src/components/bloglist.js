import { React, useState, useEffect } from "react";
//import { Table, Button } from "react-bootstrap";



const BlogList = (props) => {

    const [userName, setUsername] = useState("")
    const [blogList, setBlogList] = useState([]);

    const getBlogs = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:3001/bloglist");
        const data = await response.json();

        setBlogList(data);
        console.log(data)
    }

    
    return(
        <div>


            <button onClick={getBlogs}>Get Blogs</button>
            <div>
            {blogList.map((details) => (
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

        </div>
    )
}



export default BlogList;