import React, { useRef } from "react";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const googleVideoRef = useRef<HTMLVideoElement>(null);
  const venmoVideoRef = useRef<HTMLVideoElement>(null);
  const emailVideoRef = useRef<HTMLVideoElement>(null);

  const handleMouseOver = (videoRef: React.RefObject<HTMLVideoElement> | null) => {
    if (videoRef && videoRef.current) {
      videoRef.current.style.opacity = '1';
      videoRef.current.play()
        .then(() => console.log("Video playing"))
        .catch((error) => console.error("Error playing video:", error));
    }
  };

  const handleMouseOut = (videoRef: React.RefObject<HTMLVideoElement> | null) => {
    if (videoRef && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset the video to the beginning
      videoRef.current.style.opacity = '0';
    }
  };

  return (
    <div className="authen_panels">
      <header>
        <h1 className="authen_header">Login in or create WhereHungry account</h1>
      </header>
      <section id="login-with">
        <button
          onMouseOver={() => handleMouseOver(googleVideoRef)}
          onMouseOut={() => handleMouseOut(googleVideoRef)}
          className="video-button"
        >
          Continue with Google
          <video ref={googleVideoRef} className="hover-video" src="../assets/ModifyWhereHungry.mov" muted />
        </button>
        <button
          onMouseOver={() => handleMouseOver(venmoVideoRef)}
          onMouseOut={() => handleMouseOut(venmoVideoRef)}
          className="video-button"
        >
          Continue with Venmo
          <video ref={venmoVideoRef} className="hover-video" src="../assets/ModifyWhereHungry.mov" muted />
        </button>
        <button
          onMouseOver={() => handleMouseOver(emailVideoRef)}
          onMouseOut={() => handleMouseOut(emailVideoRef)}
          className="video-button"
        >
          Continue with email
          <video ref={emailVideoRef} className="hover-video" src="../assets/ModifyWhereHungry.mov" muted />
        </button>
      </section>
      <footer>
        <p>Footer content</p>
      </footer>
    </div>
  );
};

export default LoginPage;
