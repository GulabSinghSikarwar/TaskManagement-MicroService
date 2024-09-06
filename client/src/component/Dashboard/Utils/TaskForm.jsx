import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createTask } from '../../../service/task.service';
import { ToastContainer, toast } from 'react-toastify';
import { addTask } from '../../../store/slices/tasks.slice'
import { useDispatch } from 'react-redux';
import { addTaskAsync } from '../../../store/thunkStore/tasks.thunk'
const TaskForm = ({ toggleModal }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'Pending',
    userId: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
    
      await dispatch(addTaskAsync(formData)).unwrap();
      toggleModal({ success: true })  // Close the modal

    } catch (error) {
      toggleModal({ error: true })  // Close the modal

      console.error('Error creating task:', error);
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('USER'));
    setFormData(() => {
      return { ...formData, userId: user['_id'] }
    })
  }, [])

  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create a new task
          </h3>
          <button
            onClick={() => (toggleModal())}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="p-4 md:p-5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Task Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter task title"
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Task Details
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter task details"
                required
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              >
                <option value="Pending">Pending</option>
                <option value="In Process">In Process</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="userId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                aria-disabled

              >
                Assignee (User ID)
              </label>
              <input
                type="text"
                id="userId"
                value={formData.userId}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter assignee's user ID"
                required disabled
              />
            </div>

            {/* <div>
              <label
                htmlFor="createdAt"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Created At
              </label>
              <input
                type="datetime-local"
                id="createdAt"
                value={formData.createdAt}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="updatedAt"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Updated At
              </label>
              <input
                type="datetime-local"
                id="updatedAt"
                value={formData.updatedAt}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div> */}

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default TaskForm;
