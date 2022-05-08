import { React, useState, useEffect } from "react";
//import { Table, Button } from "react-bootstrap";



const BlogList = () => {

    const [blogList, setBlogList] = useState([]);

    const getBlogs = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:3001/blogslist");
        const data = response.json();

        setBlogList(data);
        console.log(blogList)
    }

    return(
        <div>
            {blogList.map(details => (
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



export default BlogList;