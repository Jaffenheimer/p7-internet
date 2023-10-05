import React, {useState} from 'react'
import {RecipeTitle} from '.'
import {RecipeView} from '.'
import SelectArrows from './SelectArrows'
import leftArrow from '../data/leftArrow.svg'
import rightArrow from '../data/rightArrow.svg'

const ContainerLower = () => {
 

  return (
    <RecipeView></RecipeView>
    //would be nice if the arrow were in this element (instead of recipe view)
    //but im not sure how to have shared variables between react elements
  )
}

export default ContainerLower

