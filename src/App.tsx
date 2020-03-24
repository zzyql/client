import React ,{Component,Fragment}from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { NavLink, withRouter, Route } from "react-router-dom";
import {AppBar, Tabs, Tab, Box,Typography,makeStyles} from '@material-ui/core'
import {LockOpen,Person,Loyalty,Subject} from '@material-ui/icons'
import PropTypes from 'prop-types';
import { Routes } from "./Routes";

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


const client = new ApolloClient({
  uri: 'https://pi-project-097921097e.herokuapp.com/pi-project/dev/',
});

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
      isAuthenticated: false,
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
      
    </Fragment>
  );

  showLoggedOutBar = () => (
    <Fragment>
      <NavLink to="/signup">

        <Route path="/singup"></Route>
      </NavLink>
      <NavLink to="/login">

        <Route path="/login"></Route>
      </NavLink>
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
        <AppBar position="static">
          <Tabs centered value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
            <Tab icon={<LockOpen />} label="Sign in" />
            <Tab icon={<Loyalty />}  label="Programs" />
            <Tab icon={<Subject />} label="Courses" />
            {this.state.isAuthenticated? <Tab icon={<Person />} label="Users" />:<div/>}
        
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <ProgramList/>
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          
        </TabPanel>
        <TabPanel value={this.state.value} index={3}>
          {this.state.isAuthenticated ? this.showLoggedInBar() : this.showLoggedOutBar()}
        </TabPanel>
        <Routes isAuthenticated={childProps.isAuthenticated} userHasAuthenticated={childProps.userHasAuthenticated} />
      </div>
      </ApolloProvider>
    );
  }
  
}

export default App;
