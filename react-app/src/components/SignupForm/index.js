import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import LoginForm from "../LoginForm";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState('');
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((!email.includes('@')) || email.length < 5) {
      return setErrors('Please enter a valid email.')
    }

    if (email.includes('@')) {
      const emailChars = email.split('@');
      if (emailChars[1].length < 5) {
        return setErrors('Email needs a trailing domain.')
      }
    }

    if (username.length < 5) {
      return setErrors('Username must be at least 5 characters.')
    }

    if (password.length < 6) {
      return setErrors('Password must be at least 6 characters.')
    }

    if (password !== confirmPassword) {
      return setErrors('Passwords do not match.');
    }

    await dispatch(signUp(username, email, password));

    history.push('/home')
    closeModal();

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
