import axios from "axios";
import { applicationUrls } from '../component/utils/applicationUrls'

export const createTask = async (body) => {
    const url = applicationUrls.createTask
    console.log(" url : ", url);
    const response = await axios.post(url, body);
    console.log("resp : ", response);
    return response;
}
export const fetchTaskStatus = async (userId) => {
    const url = applicationUrls.allTaskStatus(userId)
    const response = await axios.get(url);
    return response.data
}

export const updateTaskStatus = async (body) => {
    try {
        const url = applicationUrls.updateTaskStatus(body.taskId)
        //   const response = await axios.put(, { status: newStatus });
        const response = await axios.patch(url, body)
        return response;
    } catch (error) {
        console.error("Error updating task status:", error);
        throw error;
    }
};

export const updateTask = async (body) => {
    try {
        const url = applicationUrls.updateTask(body._id)
        const response = await axios.patch(url, body)
        return response;
    } catch (error) {

    }
} 

export const deleteTask =async(body)=>{
    try {
        console.log("DATA : ",body);
        const url = applicationUrls.updateTask(body._id)
        const response = await axios.delete(url, {
            data:body
        })
        return response.data;
    } catch (error) {

    }
}
