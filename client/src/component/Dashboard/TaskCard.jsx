
// src/components/Card.js
import { MdDeleteOutline } from "react-icons/md";
import TaskEditModal from './Utils/EditTask.Modal';
import React, { useState, useRef, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaRegCommentDots } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import { deleteTask } from "../../service/task.service";
import { deleteTask as deleteTaskAction } from '../../store/slices/tasks.slice'
import { useDispatch } from "react-redux";
import MoreIcon from '../../icons/moreIcon.svg'
import ButtonOptions from "./Utils/ButtonOptions";
import TaskDetails from "./Task/TaskDetails";
import './Task/task.css'
import { storageHelper } from "../utils/storage";
import MiniCommentBox from "./Task/TaskComponents/MiniCommentBox";

const Card = ({ card, index, onDeleteCard, onEditCard }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false)
  const dropdownRef = useRef(null);

  const dispatch = useDispatch()

  const [taskAction, setTaskActions] = useState([])
  const [avtarInitials, setAvtarInitials] = useState('')

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: '16px',
    margin: '0 0 8px 0',
    backgroundColor: isDragging ? "lightgreen" : "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    color: '#333',
    ...draggableStyle,
  });

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const deleteCard = async () => {
    try {
      const response = await deleteTask(card);
      dispatch(deleteTaskAction(response))
      toast.success("Deleted A Task !!", {
        containerId: 'TaskCard'
      })

    } catch (error) {
      toast.error("Something Went Wrong", {
        containerId: 'TaskCard'
      })
    }
  };

  const editCard = () => {
    onEditCard(card.id);
    setIsDropdownOpen(false); // Close dropdown after action
  };

  const toggleTaskDetailsModal = () => {
    setShowTaskDetails(!showTaskDetails);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (result) => {
    if (result) {

      if (result.success) {
        toast.success(" Task Updated  !!",
          {
            containerId: 'Dashboard'
          }
        )
      }
      if (result.error) {
        toast.error("Something Went Wrong", { containerId: 'Dashboard' })
      }
    }
    setIsOpen(!isOpen);
  };
  function generateInitials(name) {
    const names = name.split(' ');
    const initials = names.map(n => n[0].toUpperCase()).join('');
    return initials;
  }
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);


    // Setting Avatar Initials
    let user = storageHelper.get('USER')

    if (user.username) {
      const initials = generateInitials(user.username)
      setAvtarInitials(initials)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const actions = [
      {
        label: "Edit",
        action: toggleModal,
      },
      {
        label: "Delete",
        action: deleteCard
      },
      {
        label: "View Details",
        action: toggleTaskDetailsModal
      }
    ]

    setTaskActions(actions)
  }, [])



  return (
    <>
      <Draggable key={card._id} draggableId={card._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-700"
          >
            <div className="flex flex-col w-auto  px-2 text-left" >
              <div className="flex justify-between items-center w-full  pr-2">
                <h5 className="mb-1   text-[14px]  font-medium dark:text-white capitalize bg-titleBlueBg rounded-full px-4 py-2  text-pendingBlueText ">
                  {card.title}
                </h5>
                <div className="button-container flex mt-4 space-x-2">
                  <TaskEditModal task={card} isOpen={isOpen} toggleModal={toggleModal} />



                </div>
                <div>
                  {
                    taskAction.length && <ButtonOptions button={MoreIcon} options={taskAction} />
                  }
                </div>
              </div>

              <div className="pt-4">
                <p className="text-[12px] font-light  ">
                  {
                    card.content
                  }
                </p>
              </div>

              <div className="flex justify-between items-center py-2 pt-5">
                {avtarInitials && <div class="avatar" id="avatar">
                  <span class="initials" id="initials">{avtarInitials}</span>
                </div>}
                <div style={{ fontWeight: 'lighter' }} className="flex items-center ">
                <MiniCommentBox card={card}  button={MoreIcon} options={taskAction} /> 
                </div>

              </div>
            </div>


          </div>
        )}
      </Draggable>

      <TaskDetails isVisible={showTaskDetails} toggleModal={toggleTaskDetailsModal} details={card} />
    </>
  );
};

export default Card;
