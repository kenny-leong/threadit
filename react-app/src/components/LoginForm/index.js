import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SignupForm from "../SignupForm";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password))
    if (data) {
      setErrors('Invalid Username or Password.')
    } else {
      closeModal();
    }
  };

  const handleDemoLogin = async (e) => {
		e.preventDefault();
		await dispatch(login('demo@aa.io', 'password'))
      .then(closeModal)
			.catch(
				async (res) => {
					const errData = await res.json();
				}
			)
	};

  if (sessionUser) return <Redirect to="/home" />;

  return (
    <div className="login-div">
      <div className="login-headings">
        <span className="login-header">Log In</span>
        <span class="login-tos">By continuing, you are setting up a Threadit account and agree to our <span class="tos-link">User Agreement</span> and <span class="tos-link">Privacy Policy</span>.</span>
      </div>
      <form onSubmit={handleSubmit} className='login-form'>
        {(errors && (
          <div className="login-error-div">
            <span className="login-error-text">{errors}</span>
          </div>
        ))}
        <input
          type="text"
          value={email}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-submit-btn">Log In</button>
        <button className="demo-user-btn" onClick={handleDemoLogin}>Sign in as Guest</button>
        <div className="signup-redirect-div">
          <span className="signup-redirect-text">New to Threadit?</span>
          <OpenModalButton
            buttonText={<span className='login-text'>Sign up</span>}
            modalComponent={<SignupForm />}
            className='signup-redirect'
            />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
