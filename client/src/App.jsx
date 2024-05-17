
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Header />
        <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}
