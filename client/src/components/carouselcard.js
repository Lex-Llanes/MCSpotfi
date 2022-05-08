import { React, useState, useEffect } from "react";




const CarouselCard = () => {

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
            <h1>CAROUSEL CARD IS IMPORTING</h1>
            <h1>Title</h1>
            <p>Category:  </p>
            <p>Genre:  </p>
            <p>Content: </p>
            <p>Date/Time:</p>
        </div>
    )
}



export default CarouselCard;