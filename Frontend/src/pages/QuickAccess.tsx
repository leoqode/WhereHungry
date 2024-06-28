import React, { useState } from "react";
import "./QuickAccess.css";
import ProfilePicture from "../assets/examplePFP.svg";


const QuickAccess = () => {
  const [userName, setUserName] = useState() /* Test username make sure to change cuh */


  return (
    <div className='quick_access_left'>
      <div className='quick_access_left_profile'>
        <img src={ProfilePicture} height={33} alt='profile picture' className='user_profile_picture_quick_access' />
        {userName ? <span className="username_quick_access">{userName}'s recent</span>: ''}
      </div>
      <div className='recent_wheres'>Quick Where's</div>

      <div className='pending_splits'>Pending Splits</div>
    </div>
  );
};

export default QuickAccess;
