import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Main from "./components/Main";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Route exact path="/" component={ Main } />
      <Route path="/about" component={ About } />
    </BrowserRouter>
  );
}

export default App;
