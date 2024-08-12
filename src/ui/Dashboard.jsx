import React from 'react'
import './Dashboard.css'
 

const Dashboard = () => {
  return (
    <div className='dashboard'>
     <div className='top_div'>
        <div className='left_div'>
            <span className='span'>
                CNAPP Dashboard
            </span>
            <button className='addWidgetBtn'>
                Add Widget +
            </button>
        </div>
     </div>
    </div>
  )
}

export default Dashboard