import React, { useState } from "react";
import { RegisterUser } from "../Apiresponse";
import  '../Stylsheets/Register.css'
import { useNavigate } from "react-router-dom";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const request = await RegisterUser({ username, email, password });
      const response = request.data;
      console.log(response);
      if (response.success) {
        navigate('/login')
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  const handlechange = () => {
    navigate('/login')
  }

  return (
    <div className="main">


<div className="form-div">
  
<form   className="register" onSubmit={handleSubmit}>

  <h2>Register </h2>
  <hr/>
  <hr className="hrs"/>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register </button>
      
    </form>
    <button className="reg-btn" onClick={handlechange}>Login</button>
</div>

    </div>
    
  );
}

export default Register;
