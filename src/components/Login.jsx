import { Link, useNavigate } from "react-router-dom"; // Correct import for React Router
import { useState, useRef, useEffect, useContext } from "react";
import { BooksContext } from "../context/BooksContext";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify'

function Login() {
  const { login } = useContext(BooksContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);

  const emailDivRef = useRef(null);
  const passwordDivRef = useRef(null);
  const eyeRef = useRef(null);

  const Navigate = useNavigate()

  // Focus handler for email and password input fields
  const handleFocus = (target) => {
    if (target === 'email' && emailDivRef.current) {
      emailDivRef.current.classList.add('focused');
    } else if (target === 'password' && passwordDivRef.current) {
      passwordDivRef.current.classList.add('focused');
    }
  };

  // Blur handler for removing the focus from all relevant divs
  const handleBlur = () => {
    emailDivRef.current?.classList.remove('focused');
    passwordDivRef.current?.classList.remove('focused');
  };

  // Toggle password visibility
  const handleToggle = () => {
    setIcon(prev => !prev);
    setType(prev => (prev === 'password' ? 'text' : 'password'));
  };

  // Detect clicks outside of input areas to remove focus
  const handleClickOutside = (event) => {
    if (
      !emailDivRef.current?.contains(event.target) &&
      !passwordDivRef.current?.contains(event.target) &&
      !eyeRef.current?.contains(event.target)
    ) {
      handleBlur(); // Remove focus if clicked outside
    }
  };

  // Add event listener for click outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside); // Cleanup
  }, []);

// Handle login validation and API call
const handleLogin = async () => {
  if (!email || !password) {
    toast.warn("All fields are required!");
    return;
  }

  const userData = {
    email: email.trim(),
    password: password.trim(),
  };

  try {
    await login(userData); // Pass userData to login function
    setEmail("");
    setPassword("");
    toast.success("Login successful!");
    Navigate('/');
  } catch (error) {
    toast.warn("Login failed. Please check your credentials.");
  }
};


  return (
    <div className="home mt-5">
      <div className="container d-flex mt-5 justify-content-center align-items-center flex-column">
        <div className="bg-light login d-flex flex-column justify-content-center align-items-center mt-5 shadow p-3 rounded gap-4">
          <h1 className="fw-bold text-success">Login</h1>

          {/* Email input with focus handling */}
          <div ref={emailDivRef} className="w-90 bg-white border-0 rounded mb-4">
            <input
              className="w-90 rounded border-0 p-2"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
            />
          </div>

          {/* Password input with focus handling */}
          <div ref={passwordDivRef} className="w-90 bg-white border-0 rounded mb-4">
            <input
              type={type}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-90 bg-transparent rounded border-0 p-2"
              onFocus={() => handleFocus('password')}
              onBlur={handleBlur}
            />
            <span
              className="flex justify-content-end items-center"
              onClick={handleToggle}
              ref={eyeRef}
              onFocus={() => handleFocus('password')} // Ensure focus is handled on the eye icon click
            >
              {icon ? <FaEye size={25} /> : <FaEyeSlash size={25} />}
            </span>
          </div>

          <button className="btn btn-success fw-bolder w-75" onClick={handleLogin}>Login</button>
          <div className="d-flex mt-5 justify-content-center">
            <span>Don&apos;t have an account?</span>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
