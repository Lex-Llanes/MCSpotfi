import { React, useState, useEffect } from 'react'

const Login = () => {

    const [user, setUser] = useState(undefined);

    const loadUser = () => {
        fetch("/api/me")
            .then((response) => {
                if(response.status === 200){
                    return response.json()
                } else {
                    return undefined;
                }
            })
            .then((user) => {
                setUser(user)
            })
    }


    useEffect(() => {
        loadUser();
    },[]);

    return(
        <nav>
            <ul>
                {!user ? (<li><a href="http://localhost:3001/login">LOGIN</a></li>) : 
                (<li>Hello, {user.email} <a href="http://localhost:3001/logout">LOGOUT</a></li>)
                }
                
                
            </ul>
        </nav>
    )
}


export default Login;