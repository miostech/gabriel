import React from "react";
import "./GuestSchedule.css";

export default function GuestSchedule() {
  return (
    <div className="schedule_container">
      <div className="schedule_item">
        <div className="schedule_hours">16:00 - 17:00</div>
        <div>Cerimonia</div>
      </div>
      <div className="schedule_item">
        <div className="schedule_hours">17:00 - 19:00</div>
        <div>
          <div>Jogos, surpresas e </div>
          <div>convivio </div>
        </div>
      </div>
      <div className="schedule_item">
        <div className="schedule_hours">19:00</div>
        <div>Ida ao copo de água</div>
      </div>
      <div className="schedule_item">
        <div className="schedule_hours">19:30 - 22:30</div>
        <div>Copo de água</div>
      </div>
    </div>
  );
}
