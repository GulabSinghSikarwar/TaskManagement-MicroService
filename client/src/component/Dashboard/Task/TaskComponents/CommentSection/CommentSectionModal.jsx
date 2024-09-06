import React from 'react';
import { CiEdit } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import DiscussionSection from './DiscussionSection';
import './commentsSection.css'
const CommentSectionModal = ({ isOpen, toggleModal,task }) => {
  const toggleModalNative = (result) => {
    toggleModal(result);
  };

  return (
    <>
      {isOpen && (
        <div
          id="task-creation-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative  w-full max-w-md h-[80%] rounded-lg  overflow-hidden p-4 px-0  ">
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700 p-6   pt-0">
              <button
                onClick={() => toggleModalNative(false)}
                className="absolute top-[0.20rem] right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9.293l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 011.414-1.414L10 8.586z" clipRule="evenodd"></path>
                </svg>
              </button>
              <DiscussionSection task={task} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentSectionModal;
