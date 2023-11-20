import React from "react";
import video from "../../Images/WeadingVideo.mp4";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

export default function VideoPage() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [userData]);
  return (
    <div>
      <ReactPlayer
        url={video}
        style={{
          margin: 0,
          backgroundColor: "red",
          padding: 0,
          zIndex: 99,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30%",
        }}
        controls
        width="100%"
        height="100%"
        onEnded={() => {
          navigate("/guest-page");
        }}
      />
    </div>
  );
}
