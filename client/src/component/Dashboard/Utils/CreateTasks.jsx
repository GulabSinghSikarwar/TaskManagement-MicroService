import React, { useState } from 'react';
import TaskForm from './TaskForm';
import { ToastContainer, toast } from 'react-toastify';
import { IoMdAdd } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

const TaskCreationModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = (result) => {
        if (result) {

            if (result.success) {
                toast.success("Created A Task !!", { containerId: 'Dashboard' })
            }
            if (result.error) {
                toast.error("Something Went Wrong", { containerId: 'Dashboard' })
            }
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className='bg-addTaskPlusBg  rounded-full  p-2' onClick={toggleModal}> <FaPlus /></div>

            {isOpen && (
                <div
                    id="task-creation-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            <TaskForm toggleModal={toggleModal} />
                        </div>
                    </div>

                </div>
            )}
        </>
    );
};

export default TaskCreationModal;
