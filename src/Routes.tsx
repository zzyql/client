import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./component/signup/Home";
import Login from "./component/signup/Login";
import Signup from "./component/signup/Signup";
import ProgramList from "./component/programs/ProgramList";

interface RouteProps {
  isAuthenticated: boolean;
  userHasAuthenticated: (authenticated: boolean) => void;
}

export const Routes: React.SFC<RouteProps> = (childProps) =>
  <Switch>
    <Route path="/" exact render={(props) => <Home {...props} {...childProps} />}/>
    <Route path='/login' exact render={(props) => <Login {...props} {...childProps} />}/>
    <Route path='/signup' exact render={(props) => <Signup {...props} {...childProps} />}/>
    <Route path="/program" exact component={ProgramList} />
    <Route path="/" >Not Found</Route>
  </Switch>;