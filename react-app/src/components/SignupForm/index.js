import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import LoginForm from "../LoginForm";
import OpenModalButton from "../OpenModalButton";
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState('');

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors('Passwords do not match.');
    }
  };

  return (
    <div className="signup-div">
      <div className="signup-headings">
        <span className="signup-header">Sign Up</span>
        <span class="signup-tos">By continuing, you are setting up a Threadit account and agree to our <span class="tos-link">User Agreement</span> and <span class="tos-link">Privacy Policy</span>.</span>
      </div>
      <form onSubmit={handleSubmit} className='signup-form'>
        {(errors) && (
          <div className="signup-error-div">
            <span className="signup-errors">{errors}</span>
          </div>
        )}
        <input
          type="text"
          value={email}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="signup-submit-btn">Continue</button>
        <div className="login-redirect-div">
          <span className="login-redirect-text">Already a threaditor?</span>
          <OpenModalButton
            buttonText={<span className='login-text'>Log In</span>}
            modalComponent={<LoginForm />}
            className='login-redirect'
            />
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
