import React, {useEffect, useState} from 'react';
import Input from "../components/Input";
import Button from "../components/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import RequestSender from "../services/RequestSender";
import linkStyle from "../assets/linkStyle";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { state } = useLocation();

 useEffect(() => {
   state ? toast.success('Welcome to ToDo App! Continue with login!', {
     position: "top-center",
     autoClose: 3000,
     theme: 'colored'
   }) : null;
 }, [])

  const onChangeHandler = (e) => {
    setUsername(e.target.value);
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  let navigate = useNavigate();

  return (
      <>
        <ToastContainer
            position="top-center"
            autoClose={3000}
            closeButton={false}
        />
        <div className="d-flex justify-content-center py-1 background">
            <div className='login-container'>

              <h2>Welcome</h2>

              <div className='input-container'>

                <Input type="text"
                       placeholder="Username"
                       value={username}
                       onChange={onChangeHandler}
                />
                <Input type="password"
                       placeholder="Password"
                       value={password}
                       onChange={passwordChangeHandler}
                />
              </div>

              <div className='button-container'>

                <Button content="Log in"
                        onClick={() => RequestSender.loginUser(username, password, navigate)}
                        className={'main'}/>
              </div>

              <Link to='/sign-up' style={linkStyle}>Sign up</Link>
            </div>
        </div>
      </>
  );
};

export default Login;
