import axios from "axios"; 


const BACKEND_URL = "https://task-management-app-adbd5-default-rtdb.firebaseio.com/"

export async function fetchTaskData(){
   const response = await axios.get(BACKEND_URL+"task.json")
   const taskObj = []
   for(const key in response.data){
        const taskData = {
            id:key,
            status:response.data[key].status,
            typeOfWork:response.data[key].typeOfWork,
            taskDetails:response.data[key].taskDetails,
            selectedDate:response.data[key].selectedDate
        }
        taskObj.push(taskData)
   }
   return taskObj
}

export async function addTaskData(taskData){
    const response = await axios.post(BACKEND_URL+"task.json",taskData)
    return response.data.name
}

export async function updateTaskData(id,taskData){
    return await axios.put(BACKEND_URL+`task/${id}.json`,taskData)
}

export function deleteTaskData(id){
    return axios.delete(BACKEND_URL+`task/${id}.json`)
}


