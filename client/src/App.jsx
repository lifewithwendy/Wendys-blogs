
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Project from './pages/Project';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project" element={<Project />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />

      </Route>
    </Routes>
    </BrowserRouter>
  )
}
