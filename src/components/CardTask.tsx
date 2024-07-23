import { Task, TaskActions, TaskStateWork } from "../types"
import { ArrayTaskStateWork } from "../data/data"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

type CardTaskProps = {
    state:Task,
    dispatch:React.Dispatch<TaskActions>;
}

export default function CardTask({state, dispatch}:CardTaskProps) {
  
    const handleChange = (val : TaskStateWork) => {
        dispatch({type:"change-state",payload:{newTask:{
            ...state,
            state:val
        }}})   
    }

    const designCard = (val : TaskStateWork) => {
        if(val === "in work"){
            return "bg-pink-400"
        } else if(val === "postponed"){
            return "bg-yellow-400"
        } else if(val === "completed"){
            return "bg-green-400"
        } else if(val === "canceled"){
            return "bg-red-400"
        }
    }

    const deleteTask = (id:Task["id"]) => {

        const swalDelete = Swal.mixin({
            customClass: {
                confirmButton:"p-2 bg-green-400 m-2 text-white text-mono font-mono",
                cancelButton:"p-2 bg-red-400 m-2 text-white text-mono font-mono"
            },
            buttonsStyling:false
        })

        swalDelete.fire({
            title:"¿Estas seguro de borrar esta tarea?",
            text:"¡No la volverás a ver!",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText:"Borrar",
            cancelButtonText:"No"
        }).then((result)=> {
            if(result.isConfirmed){
                swalDelete.fire({
                    title:"Tarea eliminada",
                    text:"Tu tarea ha sido eliminada",
                    icon:"success"
                })
                dispatch({type:"delete-task",payload:{id:id}})
            }
        })        
    }

    const editTask = () => {
        dispatch({type:"change-activeid",payload:{activeId:state.id}})
    }
  
    return (
    <div className={`w-80 p-3 flex flex-col justify-center space-y-2 border border-black rounded-md shadow-lg ${designCard(state.state)}`}>
        <h2 className="font-bold text-2xl">{state.task}</h2>
        <p className="w-60 text-sm break-words">{state.description}</p>
        <select name="stateTask"
        className="rounded-md p-1"  
        onChange={(e)=>handleChange(e.target.value as TaskStateWork)} value={state.state}>
            {ArrayTaskStateWork.map( (a,i) => (
                <option key={i} value={a}>{a}</option>
            ))}
        </select>
        <div className="flex flex-wrap">
            <button 
            onClick={()=>deleteTask(state.id)}
            className="bg-white bg-opacity-40 p-2 rounded-md shadow-md mr-4 active:shadow-none"><FontAwesomeIcon icon={faTrash}/></button>
            <button
            onClick={editTask}
            className="bg-white bg-opacity-40 p-2 rounded-md shadow-md mr-4 active:shadow-none"><FontAwesomeIcon icon={faPencil}/></button>
        </div>
    </div>
  )
}
