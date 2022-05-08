import './App.css';
import { React } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Carousel, Navbar } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

import BlogForm from "./components/blogform"
import CarouselComp from "./components/carousel";
import Login from './components/loginpage';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark"/>
          <div>
          <Switch>
            <Route exact path="/" component={CarouselComp}/>
            <Route path="/signin" compoent={Login}/>
            <Route path="/blogform" component={BlogForm}/>
          </Switch>
          </div>
      </div>
    </Router>
  )
}

export default App;

