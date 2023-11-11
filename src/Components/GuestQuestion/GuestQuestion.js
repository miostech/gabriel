import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./GuestQuestion.css";

export default function GuestQuestion() {
  const targetDate = new Date("2024-02-04T16:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const navigate = useNavigate();

  function calculateTimeLeft() {
    const currentDate = new Date().getTime();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }
  useEffect(() => {
    setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  }, [calculateTimeLeft]);
  return (
    <div>
      <div className="countdownTimerContainerGuest">
        <h2>Tempo que falta para </h2>
        <h2>estarmos todos juntos </h2>
        <div className="countdownTimerGuest">
          <div>{timeLeft.days} Dias</div>
          <div>{timeLeft.hours} Horas</div>
          <div>{timeLeft.minutes} Minutos</div>
          <div>{timeLeft.seconds} Segundos</div>
        </div>
      </div>
      <div className="guest_page_question_container">
        <button
          className="button_question"
          onClick={() => {
            console.log("clik");
            navigate("/question");
          }}
        >
          Entra no nosso jogo!
        </button>
      </div>
    </div>
  );
}
