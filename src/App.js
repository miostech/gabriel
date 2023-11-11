import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage/homePage";
import Flower from "./Images/red-flower-frame-png-pic-vector-clipart-228173.png";
import LoginPage from "./Pages/LoginPage/loginPage";
import DataBaseProvider from "./database/teste";
import GuestPage from "./Pages/GuestPage/guestPage";
import CouplePage from "./Pages/CouplePage/couplePage";
import AllGuestsPage from "./Pages/AllGuestsPage/AllGuestsPage";
import QuestionPage from "./Pages/QuestionPage/QuestionPage";
import AllQuestionsPage from "./Pages/AllQuestionsPage/AllQuestionsPage";
function App() {
  return (
    <div className="body_main">
      <DataBaseProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/guest-page" element={<GuestPage />} />
            <Route path="/allquestions" element={<AllQuestionsPage />} />
            <Route path="/couple-page" element={<CouplePage />} />
            <Route path="/allguests" element={<AllGuestsPage />} />
            <Route path="/question" element={<QuestionPage />} />
          </Routes>
        </BrowserRouter>
      </DataBaseProvider>
      <img src={Flower} className="img1" draggable={false} />
      <img src={Flower} className="img2" draggable={false} />
    </div>
  );
}

export default App;
