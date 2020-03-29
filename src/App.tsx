import React ,{Component,Fragment}from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { NavLink, withRouter, Route } from "react-router-dom";
import {AppBar, Tabs, Tab, Box,Typography,makeStyles} from '@material-ui/core'
import {LockOpen,Person,Loyalty,Subject} from '@material-ui/icons'
import PropTypes from 'prop-types';
import { Routes } from "./Routes";
import client from './Client'
import Login from './component/signup/Login'
import ProgramList from './component/programs/ProgramList'
import './App.css';


interface AppProps {
  history: any;
}

interface AppState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  value:number;
}



function TabPanel(props:any) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  
    this.state = {
      isAuthenticated: true,
      isAuthenticating: true,
      value:0
    };

    document.title = "Bookstore Demo"
  }
  async componentDidMount() {
    // try {
    //   if (await Auth.currentSession()) {
    //     this.userHasAuthenticated(true);
    //   }
    // }
    // catch(e) {
    //   if (e !== 'No current user') {
    //     alert(e);
    //   }
    // }
  
    this.setState({ isAuthenticating: false });
  }
  userHasAuthenticated = (authenticated: boolean) => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async () => {
    // await Auth.signOut();
  
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  handleChange = (event:any, newValue:number) => {
    this.setState({value:newValue});
  };


  showLoggedInBar = () => (
    <Fragment>
    {/*
      <AppBar position="static">
        <Tabs centered value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
          <Tab icon={<Loyalty />}  label="Programs" />
          <Tab icon={<Subject />} label="Courses" />
          <Tab icon={<Person />} label="Users" />
      
        </Tabs>
      </AppBar>
      <TabPanel value={this.state.value} index={0}>
        <ProgramList/>
      </TabPanel>
      <TabPanel value={this.state.value} index={1}>

      </TabPanel>
      <TabPanel value={this.state.value} index={2}>
        
      </TabPanel>
      <TabPanel value={this.state.value} index={3}>
        
      </TabPanel>
      */}
      <NavLink to="/">
          Home
      </NavLink>

      <NavLink to="/program">
          Program
      </NavLink>

      <NavLink to="/course">
          Course
      </NavLink>

      <NavLink to="/student">
          User
      </NavLink>

    </Fragment>
  );

  showLoggedOutBar = () => (
    <Fragment>
      <NavLink to="/">
          Home
      </NavLink>

      <NavLink to="/login">
          Login
        {/*<Route path="/login"></Route>*/}
    </NavLink>
    {/*
      <AppBar position="static">
        <Tabs centered value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
          <Tab icon={<LockOpen />} label="Sign in" />
          <Tab icon={<Loyalty />}  label="Login" />
          {this.state.isAuthenticated? <Tab icon={<Person />} label="Users" />:<div/>}
      
        </Tabs>
      </AppBar>
      <TabPanel value={this.state.value} index={0}>
        
      </TabPanel>
      <TabPanel value={this.state.value} index={1}>
        <Login isAuthenticated={this.state.isAuthenticated} userHasAuthenticated={this.userHasAuthenticated}/>
      </TabPanel>
      <TabPanel value={this.state.value} index={2}>
        
      </TabPanel>
      <TabPanel value={this.state.value} index={3}>
        
      </TabPanel>
      */}
    </Fragment>
  );

  


  
  render(){

    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <ApolloProvider client={client}>
      <div>
        {this.state.isAuthenticated ? this.showLoggedInBar() : this.showLoggedOutBar()}
        <Routes isAuthenticated={childProps.isAuthenticated} userHasAuthenticated={childProps.userHasAuthenticated} />
      </div>
      </ApolloProvider>
    );
  }
  
}

export default App;
