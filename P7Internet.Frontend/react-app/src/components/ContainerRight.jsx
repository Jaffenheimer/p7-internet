import React from 'react'
import ProfilePicture from './ProfilePicture'
import NumberField from './NumberField'

const ContainerRight = () => {
  return (
    <div className='ContainerRight'>
      <div className='ContainerRightTop'>
        <div className='ContainerRightColumn'> <p id='NumberPersons'>Persons</p> </div>
        <div className='ContainerRightColumn'> <NumberField/> </div>
        <div className='ContainerRightColumn'> <ProfilePicture/> </div>
      </div>
    </div>
  )
}

export default ContainerRight