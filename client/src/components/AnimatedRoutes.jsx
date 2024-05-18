import React from 'react'
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';
import Projects from '../pages/Projects';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import PrivateRoute from "../components/PrivateRoute";
import CreatePost from '../pages/CreatePost';
import OnlyAdminPrivateRoute from "../components/OnlyAdminPrivateRoute";
import UpdatePost from '../pages/UpdatePost';
import PostPage from "../pages/PostPage";
import Search from "../pages/Search";
import CreateAd from "../pages/CreateAd";
import { Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {AnimatePresence} from 'framer-motion'

function AnimatedRoutes() {
    const location = useLocation();
  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname} >  
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute /> } >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute /> } >
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:postId" element={<UpdatePost />} />
        <Route path="/create-ad" element={<CreateAd />} />

        </Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/:postSlug" element={<PostPage />} />        
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
