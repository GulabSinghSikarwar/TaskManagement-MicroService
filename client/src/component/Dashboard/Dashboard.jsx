import React, { useEffect } from 'react'
import { initialTaskData } from '../utils/constant'
import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Columns1 from './ActionColumns/Columns1';
import Column2 from './ActionColumns/Column2';
import Column3 from './ActionColumns/Column3';
import TaskCreationModal from './Utils/CreateTasks';
import SearchBar from './Utils/searchbar';
import { fetchTaskStatus, updateTaskStatus } from '../../service/task.service';
import { ToastContainer, toast } from 'react-toastify';
import { status } from '../utils/app.enum';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask, setTasks } from '../../store/slices/tasks.slice'
import axios from 'axios';
function Dashboard() {
  const dispatch = useDispatch(); const [user, setUser] = useState(null);


  const navigate = useNavigate();
  const state = useSelector((state) => state.tasks);

  const onDragEnd = async (result) => {
    //console.log("Result : ", result);

    const { source, destination, draggableId } = result;
    //  If no destination, then do nothing  
    dispatch(moveTask({ source, destination, draggableId }));

    try {
      const user = JSON.parse(localStorage.getItem('USER'));
      const userId = user['_id']
      const body = { status: destination.droppableId, userId, taskId: draggableId }
      await updateTaskStatus(body);
      toast.success("Task status updated successfully", {
        containerId: 'Dashboard'
      });
    } catch (error) {
      toast.error("Failed to update task status", { containerId: 'Dashboard' });
    }
  };

  const getCards = (column) => {
    const cardsInfo = []
    column.tasks.forEach((cardId) => {
      const card = state.tasks[cardId];
      if (card) {
        cardsInfo.push(card);
      }
    })
    return cardsInfo
  }

  const checkLogin = () => {
    if (localStorage.getItem('USER') == null) {
      navigate('/login')
      return false
    } else {
      return true;
    }
  }

  const fetchTaskStatusData = async () => {
    if (!checkLogin()) {
      console.log("here");
      navigate('/login')
      
    }
    console.log("WHY ");
    const user = JSON.parse(localStorage.getItem('USER'));
    if (!user) {
      return
    }
    const userId = user['_id']
    try {
      const response = await fetchTaskStatus(userId)
      formatInitialData(response)
      if (response.status === 200) {
        toast.success("Successfully fetched the Status",)
      }
    } catch (error) {
      toast.error("Something Went Wrong")
    }
  }

  const formatInitialData = (response) => {
    if (response && response.columns && !response.columns[status.Pending]) {
      response.columns[status.Pending] = {
        tasks: [],
        columnId: status.Pending,
        title: "To Do"
      }
    }

    if (response && response.columns && !response.columns[status.Progress]) {
      response.columns[status.Progress] = {
        tasks: [],
        columnId: status.Progress,
        title: "In Progress"
      }
    }

    if (response && response.columns && !response.columns[status.Completed]) {
      response.columns[status.Completed] = {
        tasks: [],
        columnId: status.Completed,
        title: "Done"
      }
    }
    // //console.log("rESP : ",response);
    dispatch(setTasks(response))
  }
  const getUser = async () => {
    try {
      // const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      // const { data } = await axios.get(url, { withCredentials: true });
      // setUser(data.user._json);
    } catch (err) {
      //console.log(err);
    }
  };



  useEffect(() => {
    getUser();
    fetchTaskStatusData()

  }, [])

  return (
    <>
      {/* <TaskCreationModal /> */}
      <SearchBar />
      <div className='bg-white rounded-lg shadow dark:bg-dashboardBg mx-5 min-h-[77vh]'>

        <DragDropContext onDragEnd={onDragEnd} >
          <div className="container mx-auto p-4">
            <div className="flex flex-wrap lg:flex-nowrap justify-between">
              {
                state &&  state['tasks'] && <>
                  {state.columns[status.Pending] && <Columns1 column={state.columns[status.Pending]} cards={state.columns[status.Pending].tasks} />}
                  {state.columns[status.Progress] && <Column2 column={state.columns[status.Progress]} cards={state.columns[status.Progress].tasks} />}
                  {state.columns[status.Completed] && <Column3 column={state.columns[status.Completed]} cards={state.columns[status.Completed].tasks} />}
                </>
              }
            </div>
          </div>
        </DragDropContext>
      </div>

      <ToastContainer containerId={"Dashboard"}
        position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
        pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </>
  )
}

export default Dashboard
