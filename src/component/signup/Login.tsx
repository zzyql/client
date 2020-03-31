
import {TextField,Button,FormControl} from '@material-ui/core'
import { Redirect } from 'react-router-dom';
// import { FormGroup, FormControl, ControlLabel, Button, Glyphicon } from "react-bootstrap";
//import { Auth } from "aws-amplify";
import React, { ReactElement, useState } from 'react'
import { FacultyType } from '../Interfaces';
import { useMutation  } from '@apollo/react-hooks';
import { LOGIN } from '../Query'
import { TransferWithinAStationRounded, SettingsSharp } from '@material-ui/icons';


const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface LoginProps {
  isAuthenticated: boolean;
  userHasAuthenticated: (authenticated: boolean) => void;
}

interface LoginState {
  loading: boolean;
  isRedirect: boolean;
  email: string;
  password: string;
  emailValid: "success" | "error" | "warning" | undefined;
  passwordValid: "success" | "error" | "warning" | undefined;
}

interface LoginVars {
  email: string;
  password: string;
}

interface authPayloadType {
  faculty: FacultyType;
  token: string;
}

interface LoginData{
  authPayload: authPayloadType
}

interface Props {
  login:LoginProps;
}

export default function Login() : ReactElement  {
    // constructor(props:LoginProps){
    //   super(props);
    //   this.state = {
    //     loading: false,
    //     redirect: false,
    //     email: "",
    //     password: "",
    //     emailValid: undefined,
    //     passwordValid: undefined,
    //   };
    // }
    const [loading, setLoading] = useState(false)
    const [isRedirect, setIsRedirect] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailValid, setEmailValid] = useState("")
    const [passwordValid, setPasswordValid] = useState("")


  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setEmail(target.value);
    setEmailValid(emailRegex.test(target.value.toLowerCase()) ? 'success' : 'error');
  }

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setPassword(target.value);
    setPasswordValid(target.value.length < 8 ? 'error' : 'success')
  }

  // signIn = async (email: string, password: string) =>{
  //   const [onLogin, { error, data} ] = useMutation<LoginData, LoginVars>(
  //     LOGIN,
  //     {variables:{email: email, password: password}}
  //   )

  //   if (error) {
  //     return false
  //   }
  //   if (data && data.authPayload.token != null) {
  //     return true
  //   }
  //   else{
  //     return false
  //   }
  // }

  // onLogin = async (event: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
  //   event.preventDefault();
  //   this.setState({ loading: true });

  //   try {
  //     // const [OnLogin, { error, data} ] = useMutation<LoginData, LoginVars>(
  //     //   LOGIN,
  //     //   {variables:{email: this.state.email, password: this.state.password}}
  //     // )

  //     // if( error || data?.authPayload.token == null ){
  //     //   this.props.userHasAuthenticated(true);
  //     //   this.setState({ redirect: true })
  //     // }
  //     // else{
  //     //   //const loginResult:boolean = await this.signIn(this.state.email, this.state.password);
  //     //   this.props.userHasAuthenticated(false);
  //     //   this.setState({ redirect: false });
  //     // }
  //   } catch (e) {
  //     alert(e.message);
  //     this.setState({ loading: false });
  //   }
  // }

  const [login, { error, data }] = useMutation<LoginData, LoginVars>(
    LOGIN,
    {variables:{email: email, password: password}}
  )
  


  // if(error?.graphQLErrors){
  //   console.log("Error!" + error)
  //   //setIsRedirect(false)
  // }
  
  // if (data?.authPayload.token){
  //   props.login.isAuthenticated = false
  //   //setIsRedirect(true)
  // }
  //console.log(data?.authPayload.token)

  if (isRedirect) return <Redirect to='/' />

  return (
    <div className="Login">
      
      <div>
          <TextField
            placeholder="Enter your Username"
            label="Username"
            value={email}
            onChange={onEmailChange}
            />
          <br/>
          <TextField
          type="password"
          placeholder="Enter your Password"
          label="Password"
          value={password}
          onChange={onPasswordChange}
          />
          <br/>
          <Button color="primary" variant="text" onClick={() => {
              email && password && login().then(() => setIsRedirect(true)).catch((e) => {
                alert("Login Fail.")
                setPasswordValid("")
              }) 
            }
          }
          disabled={passwordValid !== 'success' || emailValid !== 'success' }>Log in</Button>
        </div>
    </div>
  );

}
