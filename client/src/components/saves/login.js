import React from 'react'
import { Container } from "react-bootstrap"

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=8e92fe2290ef4f0f87640cb815559a69&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
const Login = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100hv" }}>
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
            Login To Spotify
        </a>
    </Container>
  )
}




export default Login;