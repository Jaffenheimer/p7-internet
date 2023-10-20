import React from 'react'
import ProfilePicture from './ProfilePicture'


const Header = () => {
  return (
        <div className='header'>
          <div className='title'>Opskrifts Generator</div>
          <ProfilePicture />
        </div>
  )
}

export default Header