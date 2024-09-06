import React, { useState } from 'react';

import { CiEdit } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import EditTaskForm from './EditTaskForm';


const TaskEditModal = ({ task, isOpen, toggleModal }) => {
    const toggleModalNative = (result) => {
        toggleModal(result)
    }

    return (
        <>
 
            {isOpen && (
                <div
                    id="task-creation-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            <EditTaskForm toggleModal={toggleModalNative} task={task} />
                        </div>
                    </div>

                </div>
            )}
        </>
    );
};

export default TaskEditModal;
