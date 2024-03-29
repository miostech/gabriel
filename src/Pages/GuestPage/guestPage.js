import React, { useEffect } from "react";
import "./guestPage.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import GuestInfo from "../../Components/GuestInfo/GuestInfo";
import GuestSchedule from "../../Components/GuestSchedule/GuestSchedule";
import { useNavigate } from "react-router-dom";
import GuestQuestion from "../../Components/GuestQuestion/GuestQuestion";
import { useDataBaseContext } from "../../database/teste";
export default function GuestPage() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { getByPhoneNumber, updateGuest, error } = useDataBaseContext();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(userData);
    if (!userData) {
      navigate("/");
    }
  }, [userData]);

  useEffect(() => {
    getByPhoneNumber(userData.phone)
      .then()
      .catch(() => {
        localStorage.removeItem("userData");
      });
  }, [userData]);

  return (
    <>
      {userData?.is_going === true ? (
        <div className="main_container_guest">
          <GuestInfo userData={userData} />
        </div>
      ) : (
        <div className="main_container_guest">
          <div className="guest_box">
            <div className="carousel_container">
              <GuestInfo userData={userData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
