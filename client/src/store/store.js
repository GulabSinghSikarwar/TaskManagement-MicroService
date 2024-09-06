import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasks.slice';
import commentReducer from './slices/comment.slice'
const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    comments: commentReducer,
  },
});

export default store;
