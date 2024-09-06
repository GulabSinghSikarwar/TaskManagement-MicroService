import axios from 'axios';
import { applicationUrls } from '../../component/utils/applicationUrls';

const BASE_URL = 'http://localhost:8000/task';

const commentService = {
  getComments: async (taskId) => {
    const url = applicationUrls.fetchComments(taskId);
    return axios.get(url)
  },
  createComment: async (commentData) => axios.post(`${BASE_URL}/comments`, commentData),
  deleteComment: async (commentId) => axios.delete(`${BASE_URL}/comments/${commentId}`),
  createReply: async (replyData) => axios.post(`${BASE_URL}/replies`, replyData),
};

export default commentService;