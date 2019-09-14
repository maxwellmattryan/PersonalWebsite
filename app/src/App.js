// REACT IMPORTS 
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

// COMPONENT IMPORTS
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import About from "./components/About";

// SCSS IMPORT
import "./scss/app.scss";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Route exact path="/" component={ Home } />
      <Route path="/about" component={ About } />
    </BrowserRouter>
  );
}

export default App;
