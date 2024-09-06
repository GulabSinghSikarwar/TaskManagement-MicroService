import React, { useState, useEffect } from 'react';
import './commentsSection.css'
import { commentSampleData } from '../../../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../../../../../store/thunkStore/comment.thunk'
const DiscussionSection = ({task}) => {
  // const [comments] = useState(commentSampleData);

  const { comments, status, error } = useSelector((state) => state.comments);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dispatch = useDispatch();


  const handleDropdownToggle = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };
  useEffect(() => {
    dispatch(fetchComments(task._id));
  }, [dispatch, task._id]);

  return (
    <section className="bg-white dark:bg-gray-900  py-8 lg:py-3 antialiased overflow-y-auto custom-scrollbar scrollable-content rounded-lg py-0">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          {/* <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2> */}
        </div>
        <form className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..." required></textarea>
          </div>
          <button type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post comment
          </button>
        </form>
        {comments.map(comment => (
          <article key={comment.id} className="p-6 text-sm bg-white rounded-lg dark:bg-gray-900 mb-3">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img className="mr-2 w-6 h-6 rounded-full" src={comment.profilePicture} alt={comment.author} />
                  {comment.username||'Bastard'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time pubdate dateTime={comment.date} title={new Date(comment.date).toLocaleDateString()}>{new Date(comment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                </p>
              </div>
              <button
                id={`dropdownComment${comment.id}Button`}
                onClick={() => handleDropdownToggle(comment.id)}
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
                <span className="sr-only">Comment settings</span>
              </button>
              {dropdownOpen === comment.id && (
                <div id={`dropdownComment${comment.id}`} className="z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                      <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                    </li>
                    <li>
                      <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                    </li>
                  </ul>
                </div>
              )}
            </footer>
            <p className="text-gray-500 dark:text-gray-400">{comment.content}</p>
            <div className="flex items-center mt-4 space-x-4">
              <button type="button" className="flex items-center text-[10px] text-gray-500 hover:underline dark:text-gray-400 font-medium">
                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                </svg>
                Reply
              </button>
            </div>
            {/* Render replies */}
            <div className="ml-8 mt-4">
              {comment.replies && comment.replies.map(reply => (
                <div key={reply.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-2">
                  <div className="flex items-center mb-2">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      <img className="mr-2 w-6 h-6 rounded-full" src={reply.profilePicture} alt={reply.author} />
                      {reply.author}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <time pubdate dateTime={reply.date} title={new Date(reply.date).toLocaleDateString()}>{new Date(reply.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                    </p>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">{reply.content}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DiscussionSection;