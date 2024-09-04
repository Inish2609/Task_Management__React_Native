import { createContext, useState } from "react";

export const TaskContext = createContext({
    tasks:[],
    setTask:(taskData)=>{},
    addTask:(taskData)=>{},
    updateTask:(id,taskData)=>{},
    deleteTask:(id)=>{}
})

export default function TaskContextProvider(props){

    const [tasks,setTasks] = useState([])

    function setTask(taskData){
        setTasks(taskData)
    }

    function addTask(taskData,response){
        setTasks((currentState)=> [...currentState,{...taskData,id:response}])
        // console.log(tasks[1])
    }

    function deleteTask(id){
        setTasks(currentTask => currentTask.filter(task => task.id !== id))
    }

    function updateTask(id,taskData){
        const updatableTaskIndex = tasks.findIndex(
            (task) => task.id === id
            );
        const updatableTask = tasks[updatableTaskIndex];
        const updatedItem = { ...updatableTask, ...taskData };
        const updatedTask = [...tasks];
        updatedTask[updatableTaskIndex] = updatedItem;
        setTasks(updatedTask)
    }

    const value = {
        tasks:tasks,
        setTask:setTask,
        addTask:addTask,
        updateTask:updateTask,
        deleteTask:deleteTask
    }

    return <TaskContext.Provider value={value}>{props.children}</TaskContext.Provider>
}