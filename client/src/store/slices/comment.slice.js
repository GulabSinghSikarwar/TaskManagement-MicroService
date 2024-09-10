import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentThunk from '../thunkStore/comment.thunk';
import replyThunk from '../thunkStore/reply.thunk'
import commentService from '../../service/taskService/comment.service';
import { commentSampleData } from '../../component/utils/constant';
// Initial state
const initialState = {
    comments: commentSampleData,
    status: 'idle',
    error: null,
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(commentThunk.fetchComments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(commentThunk.fetchComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = action.payload;
            })
            .addCase(commentThunk.fetchComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(commentThunk.addComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            })
            .addCase(commentThunk.removeComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(comment => comment._id !== action.payload);
            })
            .addCase(replyThunk.addReply.fulfilled, (state, action) => {
                const { commentId, ...reply } = action.payload;
                const comment = state.comments.find(comment => comment._id === commentId);
                if (comment) {
                    comment.replies.push(reply);
                }
            });
    },
});

export default commentsSlice.reducer;