import React, { useEffect } from "react";
import "./guestPage.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from "pure-react-carousel";

export default function GuestPage() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <>
      {userData.is_going === false ? (
        <div className="main_container_guest">
          <div className="guest_box">
            <div className="carousel_container">
              <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={12}
                totalSlides={3}
                orientation="horizontal"
              >
                <div className="carousel_box">
                  <ButtonBack>back</ButtonBack>
                  <Slider className="carousel_slider">
                    <Slide index={0}>
                      <div className="guest_info">
                        <div>Olá {userData.name}!</div>
                        <div>{userData.greatings}</div>
                        <div>{userData.description}</div>
                      </div>
                    </Slide>
                    <Slide index={1}>
                      <p>I am the second Slide.</p>
                    </Slide>
                    <Slide index={2}>
                      <p>I am the third Slide.</p>
                    </Slide>
                  </Slider>
                  <ButtonNext>next</ButtonNext>
                </div>
              </CarouselProvider>
            </div>
          </div>
        </div>
      ) : (
        <div>Que não poderes ir</div>
      )}
    </>
  );
}
