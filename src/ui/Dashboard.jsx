import React, { useEffect } from 'react'
import './Dashboard.css'
import WidgetCard from './WidgetCard'
import { addData } from '../dashboardSlice'
import data from '../data.json';
import { useDispatch } from 'react-redux';
 

const Dashboard = ({HandleOpen }) => {
  
     const dispatch = useDispatch()
     useEffect(() => {
        if (data && data.categories) {
          data.categories.map(category => dispatch(addData(category)));
        }
      }, [dispatch]);

  return (
    <div className='dashboard'>
     <div className='top_div'>
        <div className='left_div'>
            <span className='span'>
                CNAPP Dashboard
            </span>
            <button className='addWidgetBtn' onClick={HandleOpen}>
                Add Widget +
            </button >
        </div>
        <WidgetCard/>
     </div>

     
    </div>
  )
}

export default Dashboard