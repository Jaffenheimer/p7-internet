import React from 'react'
import ProfilePicture from './ProfilePicture'
import NumberField from './NumberField'
import DietaryRestrictions from './DietaryRestrictions'

const ContainerRight = () => {
  return (
    <div className='ContainerRight'>
      <div className='ContainerRightTop'>
        <div className='ContainerRightColumn'> <p id='NumberPersons'>Personer</p> </div>
        <div className='ContainerRightColumn'> <NumberField/> </div>
        <div className='ContainerRightColumn'> <ProfilePicture/> </div>
      </div>
      <div className='ContainerRightMiddle'>
        <DietaryRestrictions/>

      </div>
    </div>
  )
}

export default ContainerRight