import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Connection from "../../pages/Connection";
import Home from "../../pages/Home";
import Utilisateur from "../../pages/Utilisateur";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Connection />
        </Route>
        <Route path="/acceuil" exact>
          <Home />
        </Route>
        <Route path="/utilisateur" exact>
          <Utilisateur />
        </Route>
        <Redirect to="/" />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
