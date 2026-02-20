// import React, { useState } from 'react'
// import { LoginUser } from '../Apiresponse';
// import { useNavigate } from 'react-router-dom'
// import '../Stylsheets/Login.css'
// function Login() {
//     const navigate = useNavigate();
//     const [email,setEmail] = useState("");
//     const [password,SetPassword] = useState("");

//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         try {
//             const request = await LoginUser({email,password});
//             const response = request.data;

//             if (response.success) {
//                 localStorage.setItem("token",response.token)

//                  localStorage.setItem("userId", response.user._id);
//                navigate('/')
//             }
//             console.log(response);
            
//         } catch (error) {
//             console.log(error);
            
//         }
//     }
//   return (
//    <>
   
//    <div className='login-main'>
//     <div className='login-card'>
//         <form className='login' onSubmit={handleSubmit}>
//             <label htmlFor="">Email</label>
            
//             <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter yor email' />
            
//             <label htmlFor="">Password</label>
//             <input type="password" value={password} onChange={(e) => SetPassword(e.target.value)} placeholder='Enter yor Password' />
//             <button type='submit'>Login</button>
//         </form>
//     </div>
//    </div>
//    </>
//   )
// }

// export default Login
import React, { useState } from 'react'
import { LoginUser } from '../Apiresponse';
import { useNavigate } from 'react-router-dom'
import '../Stylsheets/Login.css'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const request = await LoginUser({ email, password });
            const response = request.data;

            console.log("Login Response:", response); // ✅ Check the actual structure

            if (response.success) {
                // localStorage.setItem("token", response.token);
                  localStorage.setItem("token", response.data.accessToken);

    // User ID safely
    localStorage.setItem("userId", response.data.user._id);

                // ✅ Safe access for userId
                if (response.user) {
                    localStorage.setItem("userId", response.user._id);
                } else if (response.data?.user) {
                    localStorage.setItem("userId", response.data.user._id);
                } else {
                    console.warn("User data not found in response");
                }

                navigate('/');
            }
        } catch (error) {
            console.log("Login error:", error.response?.data || error);
        }
    }
      const handlechange = () => {
    navigate('/register')
      }
    return (
        <div className='login-main'>
            <div className='login-card'>
                <form className='login' onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                    />

                    <button type='submit'>Login</button>
                </form>
                <button onClick={handlechange} className='login-btn'>Register</button>
            </div>
        </div>
    )
}

export default Login;
