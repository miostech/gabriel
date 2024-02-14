import React from "react";
import "./GuestInfo.css";
import Lottie from "lottie-react";
import arrow from "./Animation-1699719932589.json";
export default function GuestInfo({ userData }) {
  return (
    <div className="guest_info">
      <text>Olá {userData.name}!</text>
      <br></br>
      <text>
        Para veres as fotografias de casamento{" "}
        <a href="https://photos.google.com/share/AF1QipMCc5mmcJNjVvD9UFTw1KnW_-MGJ5uUvX71Xvz6E49ptKONUyad0HcAsQ_4NmmRNQ?key=N3BtYXVoX01QazZpVUlhaVhMSGFTelhhZU5lNnh3">
          clica aqui!
        </a>
      </text>
      <br></br>
      <text>Obrigado por vires </text>
      <text>ao nosso casamento, {userData.name} 😀</text>
      <br></br>
    </div>
  );
}
