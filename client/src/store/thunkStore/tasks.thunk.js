import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createTask , updateTask } from '../../service/task.service'
export const addTaskAsync = createAsyncThunk(
  'tasks/addTaskAsync',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createTask(formData);
      if (response.status === 201) {
        console.log("response : ", response);
        return response.data;
      } else {
        console.log("response in other : ", response);
        return rejectWithValue('Failed to create task');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create task');
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await updateTask(taskData);
      console.log("RESP : ",response);
      return response.data; // Assuming the updated task data is returned in response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);