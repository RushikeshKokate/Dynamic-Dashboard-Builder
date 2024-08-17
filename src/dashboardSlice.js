import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  searchText: '',
  checkedWidgets: {},  
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addData: (state, action) => {
     
      const exists = state.categories.some(category => category.id === action.payload.id);
      if (!exists) {
        state.categories.push(action.payload);
      } else {
       
      }
       
    },
      
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        if (!category.widgets) {
          category.widgets = [];
        }
        category.widgets.push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    
    toggleWidgetChecked: (state, action) => {
      const { widgetId, isChecked } = action.payload;
     
      if (!state.checkedWidgets) {
        state.checkedWidgets = {};
      }
      state.checkedWidgets[widgetId] = isChecked;
    },
  },
});

export const { addData, removeCategory, addWidget, removeWidget, setSearchText, toggleWidgetChecked } = dashboardSlice.actions;

export default dashboardSlice.reducer;
