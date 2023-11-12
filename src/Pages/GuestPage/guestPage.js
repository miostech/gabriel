import React, { useEffect } from "react";
import "./guestPage.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  CarouselProvider,
  Slider,
  Slide,
} from "pure-react-carousel";
import GuestInfo from "../../Components/GuestInfo/GuestInfo";
import GuestSchedule from "../../Components/GuestSchedule/GuestSchedule";
import { useNavigate } from "react-router-dom";
import GuestQuestion from "../../Components/GuestQuestion/GuestQuestion";
export default function GuestPage() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const navigate = useNavigate();

  useEffect(() => {
    console.log(userData);
    if (!userData) {
      navigate("/");
    }
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
        <div>
          <div>Que pena não poderes ir {userData?.name} 😕</div>
        </div>
      )}
    </>
  );
}
