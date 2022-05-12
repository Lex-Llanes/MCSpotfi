import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { React } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Carousel, Navbar } from "react-bootstrap"
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios"

import BlogForm from "./components/blogform"
import CarouselComp from "./components/carousel";
import NavigationBar from './components/navbar';


function App() {

  const {
    loginWithPopup, 
    loginWithRedirect, 
    logout, 
    user, 
    isAuthenticated,
    getAccessTokenSilently
  } = useAuth0();

  console.log(user)
  console.log(isAuthenticated)


  const callApi = () => {
    axios.get('http://localhost:3001/')
      .then(response => console.log(response.data))
      .catch(error => console.log(error.message))
  }

  const callProtectedApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get('http://localhost:3001/protected', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
   <div>
    <ul>
      <li>
         <button onClick={loginWithPopup}>Login with Popup</button>
      </li>

      <li>
        <button onClick={loginWithRedirect}>Login with Redirect</button>
      </li>

      <li>
        <button onClick={logout}>Logout</button>
      </li>
    </ul>

    <ul>
      <li>
        <button onClick={callApi}>Call API</button>
      </li>

      <li>
        <button onClick={callProtectedApi}>Call Protected API Route</button>
      </li>
    </ul>




    <h3>User is { isAuthenticated ? "Logged In" : "Not Logged In"} </h3>
    { isAuthenticated && (
    <pre style={{ textAlign: 'start' }}>{JSON.stringify(user, null, 2)}</pre>
    )}
   </div>
  )
}

export default App;

