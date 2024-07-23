import type { TaskState, TaskActions } from "../types";

export const initialState : TaskState = {
    tasks:[],
    activeId:""
}

export const taskReducer = (
    state: TaskState = initialState,
    action: TaskActions
) => {
    if(action.type === "save-task"){
        return {
            ...state,
            tasks: [...state.tasks, action.payload.newTask]
        }
    }

    if(action.type === "change-state"){
        let updatedTasks = state.tasks.map(t => {
            if(t.id === action.payload.newTask.id){
                return action.payload.newTask
            } else {
                return t
            }
        })
        return {
            ...state,
            tasks: [...updatedTasks]
        }
    }

    if(action.type === "delete-task"){
        let updatedTasks = state.tasks.filter(t=> t.id !== action.payload.id)

        return {
            ...state,
            tasks:[...updatedTasks]
        }
    }

    if(action.type === "change-activeid"){
        return {
            ...state,
            activeId:action.payload.activeId
        }
    }

    if(action.type === "update-task"){
        const updatedTasks = state.tasks.map(t=>{
            if(t.id === action.payload.updateTask.id){
                return {
                    ...action.payload.updateTask
                }
            } else {return t;}
        })

        return {
            tasks:[...updatedTasks],
            activeId:""
        }
    }
}