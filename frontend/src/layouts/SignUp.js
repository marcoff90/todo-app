import React, {useState} from 'react';
import Input from "../components/Input";
import Button from "../components/Button";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import RequestSender from "../services/RequestSender";
import linkStyle from "../assets/linkStyle";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  }

  let navigate = useNavigate();

  return (
      <>
        <ToastContainer
            position="top-center"
            autoClose={3000}
            closeButton={false}
        />
        <div className='container-fluid px-0 background'>
          <div className="d-flex justify-content-center py-1">
            <div className='signup-container'>

              <h2>Sign-up</h2>

              <div className='input-signup'>

                <Input type="text"
                       placeholder="Username"
                       value={username}
                       onChange={usernameChangeHandler}/>

                <Input type="email"
                       placeholder="Email"
                       value={email}
                       onChange={emailChangeHandler}/>

                <Input type="password"
                       placeholder="Password"
                       value={password}
                       onChange={passwordChangeHandler}/>

              </div>

              <div className='button-container'>
                <Button content="Sign up"
                        onClick={() => RequestSender.registerUser(username,
                            email, password, navigate)} className={'main'}/>
              </div>

              <Link to='/' style={linkStyle}>Back to log-in</Link>

            </div>
          </div>
        </div>
      </>
  );
};

export default SignUp;
