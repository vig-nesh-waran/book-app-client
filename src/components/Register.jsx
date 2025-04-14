import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom"; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BooksContext } from "../context/BooksContext";
import { toast } from "react-toastify";


function Register() {

  const { register } = useContext(BooksContext);
  // Register states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passType, setPassType] = useState("password");
  const [confirmType, setConrirmType] = useState("password");
  const [passicon, setPassIcon] = useState(false);
  const [conPassicon, setConPassIcon] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);

  const userNameDivRef = useRef(null);
  const emailDivRef = useRef(null);
  const passwordDivRef = useRef(null);
  const confirmPasswordDivRef = useRef(null);
  const eyeRef = useRef(null);
  

  const handleFocus = (target) => {
    if (target === 'email' && emailDivRef.current) {
      emailDivRef.current.classList.add('focused');
    } else if (target === 'password' && passwordDivRef.current) {
      passwordDivRef.current.classList.add('focused');
    }
    else if (target === 'confirmPassword' && confirmPasswordDivRef.current) {
      confirmPasswordDivRef.current.classList.add('focused');
    }
    else if (target === 'userName' && userNameDivRef.current) {
      userNameDivRef.current.classList.add('focused');
    }
  };

  // Blur handler for removing the focus from all relevant divs
  const handleBlur = () => {
    userNameDivRef.current?.classList.remove('focused');
    emailDivRef.current?.classList.remove('focused');
    passwordDivRef.current?.classList.remove('focused');
    confirmPasswordDivRef.current?.classList.remove('focused');
  };

  // Toggle password visibility
  const handlePassToggle = () => {
    setPassIcon(prev => !prev);
    setPassType(prev => (prev === 'password' ? 'text' : 'password'));
  };

  // Toggle Confirm password visibility
  const handleConfirmToggle = () => {
    setConPassIcon(prev => !prev);
    setConrirmType(prev => (prev === 'password' ? 'text' : 'password'));
  };

  // Detect clicks outside of input areas to remove focus
  const handleClickOutside = (event) => {
    if (
      !userNameDivRef.current?.contains(event.target) &&
      !emailDivRef.current?.contains(event.target) &&
      !passwordDivRef.current?.contains(event.target) &&
      !confirmPasswordDivRef.current?.contains(event.target) &&
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

  useEffect(()=> {
    if( password != confirmPassword ){
      setWrongPass(true)
    } else{
      setWrongPass(false)
    }
  }, [confirmPassword])


  const HandleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

    if (!username || !email || !password || !confirmPassword) {
      toast.warn("All fields are required!");
      return;
    }

    if (username.trim().length < 3) {
      toast.error("Username must be at least 3 characters long.");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      toast.error("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error("Password must include at least one number and one special character.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match!");
      return;
    }

    // Create user object
    const userData = {
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    try {
      await register(userData);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed. Please try again later.");
    }

  };

  return (
    <div className="home mt-5">
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
      <div className="bg-light register d-flex flex-column justify-content-center align-items-center mt-3 shadow p-3 rounded gap-3">
        
         <h1 className="fw-bold text-success">Register</h1>
        
         <div ref={userNameDivRef} className="w-90 bg-white border-0 rounded mb-2">
            <input
                className="w-90 rounded border-0 p-2"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                onFocus={() => handleFocus('userName')}
                onBlur={handleBlur}
              />
          </div>
          <div ref={emailDivRef} className="w-90 bg-white border-0 rounded mb-2">
                <input
                  className="w-90 rounded border-0 p-2"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                />
          </div> 
          <div ref={passwordDivRef} className="w-90 bg-white border-0 rounded mb-2">
                <input
                  type={passType}
                  className="w-90 rounded border-0 p-2"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                />
                <span
                  className="flex justify-content-end items-center"
                  onClick={handlePassToggle}
                  ref={eyeRef}
                  onFocus={() => handleFocus('password')} // Ensure focus is handled on the eye icon click
                >
                  {passicon ? <FaEye size={25} /> : <FaEyeSlash size={25} />}
                </span>
          </div>
          <div ref={confirmPasswordDivRef} className="w-90 bg-white border-0 rounded mb-2">
                <input
                  className="w-90 rounded border-0 p-2"
                  type={confirmType}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  onFocus={() => handleFocus('confirmPassword')}
                  onBlur={handleBlur}
                />
                <span
                  className="flex justify-content-end items-center"
                  onClick={handleConfirmToggle}
                  ref={eyeRef}
                  onFocus={() => handleFocus('confirmPassword')} // Ensure focus is handled on the eye icon click
                >
                  {conPassicon ? <FaEye size={25} /> : <FaEyeSlash size={25} />}
                </span>
          </div>
          {
            wrongPass ?
              <h6 className="text-danger">Password Mismatch!</h6>
            : ''
          }
          <button className="btn btn-success fw-bolder w-75" onClick={HandleRegister}>Register</button>
          <div className="text-center">
            <div>Or</div>
            <span>Already have an account? </span>
            <Link to="/login">Login</Link>
          </div>
      </div>  
    </div>
  </div>
  );
}

export default Register;