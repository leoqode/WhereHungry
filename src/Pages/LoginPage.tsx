import React, { useRef, useEffect } from "react";
import "./LoginPage.css";
import LoginwEmail from "./LoginwEmail";
import googleVideo from "../assets/ModifyWhereHungry.mp4";
import venmoVideo from "../assets/ModifyWhereHungry.mp4";
import { useNavigate } from "react-router-dom";

const isMobile = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

interface NavigationProps {
  goForward: () => void;
  goBackward: () => void;
}

interface LoginPageProps {
  navigation?: NavigationProps;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigation }) => {
  const navigate = useNavigate();
  const googleVideoRef = useRef<HTMLVideoElement>(null);
  const venmoVideoRef = useRef<HTMLVideoElement>(null);
  const emailVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log("Google Video Ref:", googleVideoRef.current);
    console.log("Venmo Video Ref:", venmoVideoRef.current);
    console.log("Email Video Ref:", emailVideoRef.current);
  }, []);

  const handleMouseOver = (
    videoRef: React.RefObject<HTMLVideoElement>,
    buttonId: string
  ) => {
    if (!isMobile() && videoRef.current) {
      videoRef.current.playbackRate = 2;
      videoRef.current
        .play()
        .then(() => {
          console.log("Video playing");
          document.getElementById(buttonId)?.classList.add("hovered");
        })
        .catch((error) => console.error("Error playing video:", error));
    }
  };

  const handleMouseOut = (
    videoRef: React.RefObject<HTMLVideoElement>,
    buttonId: string
  ) => {
    if (!isMobile() && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      document.getElementById(buttonId)?.classList.remove("hovered");
    }
  };

  return (
    <div className='authen_panels'>
      <LoginwEmail></LoginwEmail>
      <div className='divider_wrapper'>
        <span className='divider'>Or</span>
      </div>
      <header></header>
      <section id='login-with'>
        <button
          id='google-button'
          onMouseOver={() => handleMouseOver(googleVideoRef, "google-button")}
          onMouseOut={() => handleMouseOut(googleVideoRef, "google-button")}
          className='video-button'
        >
          <span>Continue with Google</span>
          <video ref={googleVideoRef} className='hover-video' muted loop>
            <source src={googleVideo} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </button>
        <button
          id='venmo-button'
          onMouseOver={() => handleMouseOver(venmoVideoRef, "venmo-button")}
          onMouseOut={() => handleMouseOut(venmoVideoRef, "venmo-button")}
          className='video-button'
        >
          <span>Continue with Venmo</span>
          <video ref={venmoVideoRef} className='hover-video' muted loop>
            <source src={venmoVideo} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </button>
      </section>
      <footer></footer>
    </div>
  );
};

export default LoginPage;
