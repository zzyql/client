import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import './App.css';
import Login from './Login'

import {AppBar, Tabs, Tab, Box,Typography,makeStyles} from '@material-ui/core'
import {LockOpen,Person,Loyalty,Subject} from '@material-ui/icons'
import PropTypes from 'prop-types';




const client = new ApolloClient({
  uri: 'https://pi-project-097921097e.herokuapp.com/pi-project/dev/',
});

function TabPanel(props) {
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


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const isAuthenticated=true;

  return (
    <ApolloProvider client={client}>
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs centered value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab icon={<LockOpen />} label="Sign in" />
          <Tab icon={<Loyalty />}  label="Programs" />
          <Tab icon={<Subject />} label="Courses" />
          {isAuthenticated? <Tab icon={<Person />} label="Users" />:<div/>}
      
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Login/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
        
      </TabPanel>
      <TabPanel value={value} index={3}>
        
      </TabPanel>
    </div>
    </ApolloProvider>
  );
}

export default App;
