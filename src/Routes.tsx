import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./component/signup/Home";
import Login from "./component/signup/Login";
import Signup from "./component/signup/Signup";
import ProgramList from "./component/programs/ProgramList";
import CourseList from "./component/courses/CourseList";
import Course from "./component/courses/Course";
import StudentList from "./component/students/StudentList";
interface RouteProps {
  isAuthenticated: boolean;
  userHasAuthenticated: (authenticated: boolean) => void;
}

export const Routes: React.FunctionComponent<RouteProps> = (childProps) =>
  <Switch>
    <Route path="/" exact render={(props) => <Home {...props} {...childProps} />}/>
    <Route path='/login' exact render={(props) => <Login {...props} {...childProps} />}/>

    <Route path="/program" exact component={ProgramList} />
    <Route path="/course" exact component={CourseList} />
    <Route path="/student" exact component={StudentList} />

    <Route path="/course/:id" exact component={Course} />
    
    <Route path="/" >Not Found</Route>
  </Switch>;