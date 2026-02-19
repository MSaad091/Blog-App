// import React from 'react'
// import { logoutUser } from '../Apiresponse';
// import { useNavigate } from 'react-router-dom';
// function Home() {
//     const navigate = useNavigate();

//     const handleClick = async() => {
// try {
//     const request = await logoutUser();
//     const response = request.data;
//     console.log(response);

//     localStorage.removeItem("token");

//     navigate('/login')
    
// } catch (error) {
//     console.log(error);
    
// }
//     }

//     const Createblog = () => {
//         navigate('/createblog')
//     }

//     const viewallblog = () => {
//         navigate('/getallblog')
//     }
//   return (
//     <div>
//         <button onClick={handleClick}>Logout</button>

//         <button onClick={Createblog}>Create Blog</button>
//         <button onClick={viewallblog}>View All Blog</button>
      

//     </div>
//   )
// }

// export default Home 

import React from 'react'
import { logoutUser } from '../Apiresponse';
import { useNavigate } from 'react-router-dom';
import '../Stylsheets/Home.css'

function Home() {
    const navigate = useNavigate();

    const handleClick = async() => {
        try {
            const request = await logoutUser();
            const response = request.data;
            console.log(response);

            localStorage.removeItem("token");
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }

    const Createblog = () => {
        navigate('/createblog')
    }

    const viewallblog = () => {
        navigate('/getallblog')
    }

    return (
        <div className="home">
            {/* background animation */}
            <div className="bg-animation"></div>

            <div className="home-card">
                <h2>Welcome Back 👋</h2>

                <button onClick={Createblog}>✍ Create Blog</button>
                <button onClick={viewallblog}>📚 View All Blogs</button>
                <button className="logout" onClick={handleClick}>🚪 Logout</button>
            </div>
        </div>
    )
}

export default Home;
