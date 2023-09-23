import "./App.css";
import { Route, Router, RouterProvider, Routes } from "react-router-dom";
import Home from "./Pages/HomePage/homePage";
import Flower from "./Images/red-flower-frame-png-pic-vector-clipart-228173.png";
import VideoPage from "./Pages/VideoPage/video";
import LoginPage from "./Pages/LoginPage/loginPage";

function App() {
  return (
    <div className="body_main">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/video-page" element={<VideoPage />} />
      </Routes>
      <img src={Flower} className="img1" draggable={false} />
      <img src={Flower} className="img2" draggable={false} />
    </div>
  );
}

export default App;
