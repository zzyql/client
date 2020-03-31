import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./component/signup/Home";
import Login from "./component/signup/Login";
import Signup from "./component/signup/Signup";
import ProgramList from "./component/programs/ProgramList";
import ProgramDetail from "./component/programs/ProgramDetail";
import CourseList from "./component/courses/CourseList";
import Course from "./component/courses/Course";
import StudentList from "./component/students/StudentList";
import Student from "./component/students/Student";
import CreateProgram from "./component/programs/CreateProgram";
import CreateCourse from "./component/courses/CreateCourse";
import UpdateProgram from "./component/programs/UpdateProgram";
import Enrollment from "./component/enrollment/Enrollment";
interface RouteProps {
  isAuthenticated: boolean;
  userHasAuthenticated: (authenticated: boolean) => void;
}

export const Routes: React.FunctionComponent<RouteProps> = (childProps) =>
  <Switch>
    <Route path="/" exact render={(props) => <Home {...props} {...childProps} />}/>
    <Route path='/signup' exact render={(props) => <Signup {...props} {...childProps} />}/>
    <Route path='/login' exact component={Login}/>

    <Route path="/program/create" exact component={CreateProgram} />
    <Route path="/programs" exact component={ProgramList} />
    <Route path="/program/:id" exact component={ProgramDetail} />
    <Route path="/program/update/:id" exact component={UpdateProgram} />

    <Route path="/course/create" exact component={CreateCourse} />
    <Route path="/courses" exact component={CourseList} />
    <Route path="/course/:id" exact component={Course} />

    
    <Route path="/students" exact component={StudentList} />
    <Route path="/student/:id" exact component={Student} />
    
    <Route path="/" >Not Found</Route>
  </Switch>;