import { createAsyncThunk } from '@reduxjs/toolkit';
import commentService from '../../service/taskService/comment.service';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (taskId, { rejectWithValue }) => {
        try {
            const response = await commentService.getComments(taskId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addComment = createAsyncThunk(
    'comments/addComment',
    async (commentData, { rejectWithValue }) => {
        try {
            const response = await commentService.createComment(commentData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeComment = createAsyncThunk(
    'comments/removeComment',
    async (commentId, { rejectWithValue }) => {
        try {
            await commentService.deleteComment(commentId);
            return commentId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export default { addComment, fetchComments, removeComment }