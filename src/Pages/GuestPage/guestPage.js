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
          <div className="guest_box">
            <div className="carousel_container">
              <CarouselProvider
                naturalSlideWidth={10}
                naturalSlideHeight={100}
                totalSlides={3}
                orientation="horizontal"
                disableKeyboard={false}
                preventVerticalScrollOnTouch
                lockOnWindowScroll
              >
                <div className="carousel_box">
                  <Slider className="carousel_slider">
                    <Slide index={0}>
                      <GuestInfo userData={userData} />
                    </Slide>
                    <Slide index={1}>
                      <GuestSchedule />
                    </Slide>
                    <Slide index={2}>
                      <GuestQuestion />
                    </Slide>
                  </Slider>
                </div>
              </CarouselProvider>
            </div>
          </div>
        </div>
      ) : (
        <div className="home_page_container">
          <div>Que pena não poderes ir {userData?.name} 😕</div>
        </div>
      )}
    </>
  );
}
