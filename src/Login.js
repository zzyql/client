
import {Button,TextField, MuiThemeProvider } from '@material-ui/core';
import React from 'react'
import axios from 'axios';


class Login extends React.Component {
    constructor(props){
      super(props);
      this.state={
        username:'',
        password:''
      }
}

handleClick(event){
    var apiBaseUrl = "http://localhost:4000/api/";
    var self = this;
    var payload={
        "email":this.state.username,
        "password":this.state.password
    }
    axios.post(apiBaseUrl+'login', payload)
    .then(function (response) {
        console.log(response);
    if(response.data.code === 200){
        console.log("Login successfull");
        var uploadScreen=[];
        //uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
        self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
    }
    else if(response.data.code === 204){
        console.log("Username password do not match");
        alert("username password do not match")
    }
    else{
        console.log("Username does not exists");
        alert("Username does not exist");
    }
    })
    .catch(function (error) {
        console.log(error);
    });
}
render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
           <TextField
             placeholder="Enter your Username"
             label="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
            <TextField
            type="password"
            placeholder="Enter your Password"
            label="Password"
            onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/>
            <Button color="primary" variant="text" style={style} onClick={(event) => this.handleClick(event)}>Submit</Button>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;