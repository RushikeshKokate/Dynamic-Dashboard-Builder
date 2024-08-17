import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeWidget, addWidget } from '../dashboardSlice';
import './WidgetCard.css';

const WidgetCard = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.dashboard.categories || []);
  const searchText = useSelector(state => state.dashboard.searchText || '');

  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetText, setNewWidgetText] = useState('');
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

 
  const searchResults = categories.flatMap(category =>
    category.widgets
      .filter(widget =>
        widget.name.toLowerCase().includes(searchText.toLowerCase())
      )
      .map(widget => ({ ...widget, categoryId: category.id }))
  );

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  const handleAddWidget = (categoryId) => {
    setCurrentCategoryId(categoryId);
  };

  const handleSubmit = () => {
    if (newWidgetName && newWidgetText && currentCategoryId) {
      dispatch(addWidget({
        categoryId: currentCategoryId,
        widget: { name: newWidgetName, text: newWidgetText }
      }));
      setNewWidgetName('');
      setNewWidgetText('');
      setCurrentCategoryId(null);
    }
  };

  return (
    <div className='widget-container'>
      {/* Search Results Section */}
      {searchText && searchResults.length > 0 && (
        <div className='search-results'>
          <h2 className='category-title'>Search Results</h2>
          <div className='widgets'>
            {searchResults.map(widget => (
              <div key={widget.id} className='widget-card'>
                <button onClick={() => handleRemoveWidget(widget.categoryId, widget.id)} className='remove-btn'>x</button>
                <h3>{widget.name}</h3>
                <p>{widget.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Original Categories and Widgets Section */}
      {categories.map(category => (
        <div key={category.id} className='category'>
          <h2 className='category-title'>{category.name}</h2>
          <div className='widgets'>
            {category.widgets.map(widget => (
              <div key={widget.id} className='widget-card'>
                <button onClick={() => handleRemoveWidget(category.id, widget.id)} className='remove-btn'>x</button>
                <h3>{widget.name}</h3>
                <p>{widget.text}</p>
              </div>
            ))}
            <div className='widget-card add-widget-card'>
              <button className='addwidbtn' onClick={() => handleAddWidget(category.id)}>Add widget +</button>
            </div>
          </div>
        </div>
      ))}

      {currentCategoryId && (
        <div className='popup-overlay'>
          <div className='popup-content'>
            <h3>Add a new widget</h3>
            <input
              type='text'
              className='in'
              placeholder='Widget Name'
              value={newWidgetName}
              onChange={(e) => setNewWidgetName(e.target.value)}
            />
            <textarea
              placeholder='Widget Text'
              className='text'
              value={newWidgetText}
              onChange={(e) => setNewWidgetText(e.target.value)}
            ></textarea>
            <button className='addwidbtn' onClick={handleSubmit}>Add Widget</button>
            <button className='addwidbtn' onClick={() => setCurrentCategoryId(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WidgetCard;
