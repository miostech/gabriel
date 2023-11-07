import React from "react";

export default function GuestInfo({ userData }) {
  return (
    <div className="guest_info">
      <div>Olá {userData.name}!</div>
      <div>{userData.greatings}</div>
      <div>{userData.description}</div>
      <br></br>
      <div>Bem vindo! </div>
      <div>Ao nosso site de casamento!</div>
      <br></br>
      <div>Obrigado por aceitares </div>
      <div>o nosso convite {userData.name} 😀</div>
      <br></br>
      <div>Se quiseres saber o que vai acontecer</div>
      <div>faz scroll para a direita!</div>
    </div>
  );
}
