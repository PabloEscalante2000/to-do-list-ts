import type { TaskState, TaskActions, Task } from "../types"
import React, { useEffect, useState } from "react"
import {v4 as uuidv4} from "uuid"

type FormToDoProps = {
    state: TaskState,
    dispatch : React.Dispatch<TaskActions>
}

export default function FormToDo({state,dispatch}:FormToDoProps) {
  
    const initialTask : Task = {
        id:"",
        task:"",
        description:"",
        state:"in work"
    }
    
    const [taskForm, setTaskForm] = useState<Task>(initialTask)

    useEffect(()=>{
        if(existTask()){
            setTaskForm(existTask()!)
        } else {
            setTaskForm(initialTask)
        }
    },[state.activeId])

    const handleChange = (val : string, ori:string) => {
        if(ori === "task"){
            setTaskForm({
                ...taskForm,
                task:val
            })
        } else if(ori === "description"){
            setTaskForm({
                ...taskForm,
                description:val
            })
        }
    }

    useEffect(()=>console.log(state),[state.tasks])

    const handleCick = () => {
        if(existTask()){
            dispatch({type:"update-task",payload:{updateTask:{
                ...taskForm,
                id:state.activeId
            }}})
        } else {
            dispatch({
                type:"save-task",
                payload:{newTask:{
                    ...taskForm,
                    id:uuidv4()
                }}
            })
        }
        
        setTaskForm(initialTask)
    }

    const existTask = () => {
        const activeTask = state.tasks.find(t=>t.id === state.activeId)
        return activeTask
    }
  
    return (
    <>
        <section className="flex p-12 justify-center bg-repeat bg-contain bg-center" 
        style={{backgroundImage:"url(/fondo-repetitivo-fresa.jpg)"}}>
            <form className="bg-white bg-opacity-25 backdrop-blur-md p-6 rounded-md shadow-lg flex flex-col justify-stretch space-y-3 w-80">
                <label className="text-2xl font-bold" htmlFor="task">Task:</label>
                <input className="border border-pink-400 rounded-md p-2" type="text" id="task"
                value={taskForm.task}
                placeholder="name of the task"
                onChange={(e)=>handleChange(e.target.value,"task")}
                />
                <label className="font-bold text-xl" htmlFor="description">Description:</label>
                <textarea className="resize-none p-2 border border-pink-400 rounded-md" id="description"
                value={taskForm.description} rows={4} placeholder="I have to..."
                onChange={(e)=>handleChange(e.target.value,"description")}
                />
                <input className="bg-pink-400 py-1 w-40 m-auto text-white rounded-md transition-all hover:bg-pink-500 cursor-pointer" type="button" value={existTask() ? "Edit":"Asign"}
                onClick={handleCick}/>
            </form>
        </section>
    </>
  )
}
