import React from 'react'
import profile from '../data/profile.svg'

const ProfilePicture = () => {

  function profileClick() {
    alert('You clicked me!');
  }
  

  return (
    <div className='ProfilePicture'>
          <img src={profile} alt='Profile picture' onClick={profileClick}/>
    </div>
  )
}

export default ProfilePicture