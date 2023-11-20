import React from "react";
import "./GuestInfo.css";
import Lottie from "lottie-react";
import arrow from "./Animation-1699719932589.json";
export default function GuestInfo({ userData }) {
  return (
    <div className="guest_info">
      <text>Olá {userData.name}!</text>
      <text>{userData.greatings}</text>
      <text>{userData.description}</text>
      <br></br>
      <text>Bem vindo! </text>
      <text>Ao nosso site de casamento!</text>
      <br></br>
      <text>Obrigado por aceitares </text>
      <text>o nosso convite {userData.name} 😀</text>
      <br></br>
      <text>Se quiseres saber o que vai acontecer</text>
      <text>faz scroll para a esquerda!</text>
      <div>
        <Lottie
          animationData={arrow}
          style={{
            position: "absolute",
            top: 150,
            transform: "rotate(180deg)",
          }}
        />
      </div>
    </div>
  );
}
