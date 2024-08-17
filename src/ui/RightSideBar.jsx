import React, { useState } from 'react';
import './RightSideBar.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeWidget, toggleWidgetChecked } from '../dashboardSlice'; // Adjust import path as needed

const RightSideBar = ({ Open, HandleOpen }) => {
  const categories = useSelector(state => state.dashboard.categories || []);
  const checkedWidgets = useSelector(state => state.dashboard.checkedWidgets || {});
  const dispatch = useDispatch();
  
 
  const [localCheckedWidgets, setLocalCheckedWidgets] = useState({ ...checkedWidgets });

  const handleCheckboxChange = (categoryId, widgetId, isChecked) => {
 
    setLocalCheckedWidgets(prevState => ({
      ...prevState,
      [widgetId]: isChecked,
    }));
    
    dispatch(toggleWidgetChecked({ widgetId, isChecked }));
  };

  const handleRemoveWidgets = () => {
    categories.forEach(cat => {
      cat.widgets.forEach(widget => {
        if (localCheckedWidgets[widget.id] === false) {
          dispatch(removeWidget({ categoryId: cat.id, widgetId: widget.id }));
        }
      });
    });
    setLocalCheckedWidgets(prevState => {
      const newState = { ...prevState };
      Object.keys(newState).forEach(widgetId => {
        if (newState[widgetId] === false) {
          delete newState[widgetId];
        }
      });
      return newState;
    });
  };

  const handleCancel = () => {
    const allCheckedWidgets = {};
    categories.forEach(cat => {
      cat.widgets.forEach(widget => {
        allCheckedWidgets[widget.id] = true;
      });
    });
    setLocalCheckedWidgets(allCheckedWidgets);
    Object.keys(allCheckedWidgets).forEach(widgetId => {
      dispatch(toggleWidgetChecked({ widgetId, isChecked: true }));
    });
    HandleOpen();
  };

  return (
    <>
      <div className={`overlay ${Open ? 'visible' : ''}`} onClick={HandleOpen}></div>
      <div className={`side-bar ${Open ? 'open' : ''}`}>
        <div className='top'>
          <span>Add Widget</span>
          <button className='close-btn' onClick={HandleOpen}>x</button>
        </div>
        <span className='span'>Personalise your dashboard by adding the following widgets</span>
        <div className='input-container'>
          {categories.map(cat => (
            <div key={cat.id} className='input'>
              <h3>{cat.name}</h3>
              {cat.widgets && cat.widgets.map(widget => (
                <div key={widget.id} className='checkbox-group'>
                  <input
                    type="checkbox"
                    id={`widget-${cat.id}-${widget.id}`}
                    checked={localCheckedWidgets[widget.id] !== false} // Use local state for checked status
                    onChange={(e) => handleCheckboxChange(cat.id, widget.id, e.target.checked)}
                  />
                  <label htmlFor={`widget-${cat.id}-${widget.id}`}>{widget.name}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className='btnDiv'>
        <button onClick={handleRemoveWidgets} className="remove-widgets-btn">Conform</button>
        <button onClick={handleCancel} className="cancel-btn">Cancel</button>
        </div>
        
      </div>
    </>
  );
};

export default RightSideBar;
