// REACT IMPORTS 
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// COMPONENT IMPORT
import C from "./components";

// SCSS IMPORT
import "./styles/app.scss";

function App() {
  return (
    <BrowserRouter>
      <C.Navigation.MainNavBar />
      <Switch>
        <Route exact path="/">
          <C.Sections.Landing />
          <C.Sections.Project projects={ C.Data.Projects } />
          <C.Sections.TechStack technologies={ C.Data.Technologies } />
          <C.Sections.Footer />
        </Route>
        <Route path="/about" component={ C.Sections.About } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
