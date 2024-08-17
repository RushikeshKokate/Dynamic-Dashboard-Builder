import React from 'react'
import { useSelector } from 'react-redux'

const Trial = () => {
   const Categories = useSelector(state=> state.dashboard.categories)
   console.log(Categories, "here");
   
  return (
    <div></div>
  )
}

export default Trial