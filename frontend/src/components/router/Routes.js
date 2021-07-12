import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Connection from "../../pages/Connection";
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import Utilisateur from "../../pages/Utilisateur";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Connection} />
        <Route path="/acceuil" exact component={Home} />
        <Route path="/utilisateur" exact component={Utilisateur} />
        <Redirect to="/" />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
