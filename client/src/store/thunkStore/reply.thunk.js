import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentService from '../../service/taskService/reply.service';
import replyService from '../../service/taskService/reply.service';

export const addReply = createAsyncThunk(
    'comments/addReply',
    async (replyData, { rejectWithValue }) => {
        try {
            const response = await replyService.createReply(replyData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export default { addReply }