import React, { useRef, useEffect, useState } from "react";
import "./LoginPage.css";
import GoogleLogo from "../assets/google-logo-9808 1.svg";
import VenmoLogo from "../assets/Venmo.svg";
import LoginwEmail from "./LoginwEmail";
import SignupPage from "./SignupPage";
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
  const [isLoginView, setIsLoginView] = useState(true);

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
      videoRef.current.playbackRate = 2.6;
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

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className='authen_panels'>
      {isLoginView ? (
        <LoginwEmail navigation={navigation} />
      ) : (
        <SignupPage></SignupPage>
      )}
      <div className='divider_wrapper'>
        <span className='divider'>Or</span>
      </div>
      <section id='login-with'>
        <button
          id='google-button'
          onMouseOver={() => handleMouseOver(googleVideoRef, "google-button")}
          onMouseOut={() => handleMouseOut(googleVideoRef, "google-button")}
          className='video-button'
        >
          <span>Continue with </span>
          <video ref={googleVideoRef} className='hover-video' muted loop>
            <source src={googleVideo} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
          <img
            alt='Google'
            src={GoogleLogo}
            width={23}
            height={23}
            className='login_w_logos'
            id='google-logo'
          />
        </button>
        <button
          id='venmo-button'
          onMouseOver={() => handleMouseOver(venmoVideoRef, "venmo-button")}
          onMouseOut={() => handleMouseOut(venmoVideoRef, "venmo-button")}
          className='video-button'
        >
          <span>Continue with </span>
          <video ref={venmoVideoRef} className='hover-video' muted loop>
            <source src={venmoVideo} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
          <img
            src={VenmoLogo}
            height={33}
            width={43}
            alt='Venmo'
            id='venmo-logo'
          />
        </button>
      </section>
      {isLoginView ? (
        <p>
          Don't have an account?{" "}
          <button className='signup_toggle_view' onClick={toggleView}>
            Sign up
          </button>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <button className='signup_toggle_view' onClick={toggleView}>
            Log in
          </button>
        </p>
      )}
    </div>
  );
};

export default LoginPage;
/*          
        </>
      ) : (
        <>
          <SignupPage navigation={navigation} />
          <p>Already have an account? <button className="signup_toggle_view" onClick={toggleView}>Log in</button></p>
        </>
      )} */
