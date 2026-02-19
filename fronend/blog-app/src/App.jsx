import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectRoute from './ProtectRoute'
import Home from './pages/Home'
import BlogCreate from './pages/BlogCreate'
import ViewSingleBlog from './pages/ViewSingleBlog'
import Blogall from './pages/Blogall'
import UpdateBlog from './pages/UpdateBlog'

// import AllBlog from './pages/AllBlog'

function App() {
  return (

    <>
    <Routes>
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route
    path="/"
    element={
      <ProtectRoute>
        <Home />
      </ProtectRoute>
    }
  />
   <Route
    path="/home"
    element={
      <ProtectRoute>
        <Home />
      </ProtectRoute>
    }
  />
  <Route path='/allblog' element={<Blogall/>} />
  <Route path='/createblog' element={<BlogCreate/>} />
  {/* <Route path='/getblog/:id' element={}/> */}
  <Route  path='/getblog/:id' element={<ViewSingleBlog/>}  />
  <Route path='/getallblog' element={<Blogall/>} />
  <Route path="/updateblog/:blogId" element={<UpdateBlog />} />


</Routes>

    </>
  )
}

export default App