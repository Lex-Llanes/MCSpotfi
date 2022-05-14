import { React, useState, useEffect } from "react";


const BlogForm = (props) => {
    const [userName, setUsername] = useState("")
    const [blogPrivacy, setBlogPrivacy] = useState("")
    const [blogCategory, setBlogCategory] = useState("");
    const [blogGenre, setBlogGenre] = useState("");
    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");

    const [artistName, setArtistName] = useState("");
    const [trackName, setTrackName] = useState("");


    useEffect(() => {
        setUsername(props.user.email)
    },[])

    //SUBMITS NEW BLOG
    const handleSubmitBlog = async (event) => {
        event.preventDefault();
        
        try {
            const body = { blogPrivacy, blogCategory, blogGenre, blogTitle, blogContent, userName, artistName, trackName }
            console.log(body)
            const response = await fetch("http://localhost:3001/userblog",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                }
            )
            console.log(response)
        } catch (error) {
            console.error(error.message)
        }
    } 
    
    

    //SEARCHES FOR PROPER TRACK
    const handleTrackSearch = async (event) => {
        event.preventDefault()
        try {
            const body = { artistName, trackName }

            const response = await fetch(`http://localhost:3001/track`, 
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                }
            )
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(error.message)
        }
    }



    return (
        <div>
            <form onSubmit={handleTrackSearch}>
                <br/>
                <label for="artistname">Artist Name</label>
                <br/>
                <input
                    id="artistname"
                    name="artistname"
                    placeholder="Enter Artist Name..."
                    value={artistName}
                    onChange={(event) => setArtistName(event.target.value)}
                />
                <br/>
                <br/>

                <label for="trackname">Track Name</label>
                <br/>
                <input 
                    id="trackname"
                    name="trackname"
                    placeholder="Enter Track Name..."
                    value={trackName}
                    onChange={(event) => setTrackName(event.target.value)}
                />
                <br/>
                <br/>

                <input
                    value="Submit"
                    type="submit"
                />

            </form>




            {/* BLOG FORM */}
            <form onSubmit={handleSubmitBlog}>
                

                <br/>   
                <input 
                    id="username"
                    name="username"
                    placeholder="Username..."
                    value={userName}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <br/>
                <br/>

                <label for="blogprivacy">Blog Privacy</label>
                <br/>
                <select 
                    id="blogprivacy"
                    name="blogprivacy"
                    value={blogPrivacy}
                    onChange={(event) => setBlogPrivacy(event.target.value)}
                >
                    {/* <option value="none">Please Select Privacy</option> */}
                    <option value="publics">Public</option>
                    <option value="private">Private</option>
                </select>
                <br/>
                <br/>

                {/* Option for blog's mood which will determine the blog search parameter */}
                <label for="usermood">Your Mood</label>
                <br/>
                <input
                    id="usermood"
                    name="usermood"
                    placeholder="Your mood..."
                    value={blogCategory}
                    onChange={(event) => setBlogCategory(event.target.value)}
                />

                <br/>
                <br/>


                <label for="bloggenre">Blog's Genre</label>
                <br/>
                <select
                    name="bloggenre"
                    id="bloggenre"
                    value={blogGenre}
                    onChange={(event) => setBlogGenre(event.target.value)}

                >
                    <option value="none">Please Select A Genre</option>
                    <option value="rock">Rock</option>
                    <option value="pop">Pop</option>
                    <option value="hiphop">Hip Hop</option>
                    <option value="rnb">RnB</option>
                    <option value="country">Country</option>
                    <option value="jazz">Jazz</option>
                    <option value="metal">Metal</option>
                    <option value="electronic dance music">Electronid Dance Music</option>
                    <option value="rap">Rap</option>
                    <option value="indie">Indie</option>
                    <option value="reggae">Reggae</option>
                    <option value="instrumental">Instrumental</option>
                    <option value="soul">Soul</option>
                    <option value="progressive">Progressive</option>


                </select>
                <br/>
                <br/>


                <label for="blogtitle">Blog Title</label>
                <br/>
                <input 
                    name="blogtitle"
                    id="blogtitle"
                    type="text"
                    placeholder="Blog title..."
                    value={blogTitle}
                    onChange={(event) => setBlogTitle(event.target.value)}
                />
                <br/>
                <br/>


                <label for="blogcontent">Blog Content</label>
                <br/>
                <textarea 
                    name="blogcontent"
                    id="blogcontent"
                    type="textarea"
                    placeholder="Blog content..."
                    value={blogContent}
                    onChange={(event) => setBlogContent(event.target.value)}
                />
                <br/>
                <br/>

                <input 
                    type="submit"
                    value="Submit"
                />
            </form>
            
        </div>
    )



}


export default BlogForm;