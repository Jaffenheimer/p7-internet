import React from 'react'
import ProfilePicture from './ProfilePicture'
import NumberField from './NumberField'

const ContainerRight = () => {
  return (
    <div className='ContainerRight'>
      <div className='ContainerRightTop'>
        <div className='containerRightColumn'> <p id='numberPersons'>Persons</p> </div>
        <div className='containerRightColumn'> <NumberField/> </div>
        <div className='containerRightColumn'> <ProfilePicture/> </div>
      </div>
    </div>
  )
}

export default ContainerRight