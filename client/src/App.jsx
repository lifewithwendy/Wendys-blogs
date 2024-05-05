
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Projects from './pages/Projects';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from './pages/CreatePost';
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>  
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute /> } >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute /> } >
        <Route path="/create-post" element={<CreatePost />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />        
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
