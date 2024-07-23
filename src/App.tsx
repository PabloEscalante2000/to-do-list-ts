import { useReducer } from 'react'
import './App.css'
import FormToDo from './components/FormToDo'
import { initialState, taskReducer } from './reducers/TaskReducer'
import TaskListComponent from './components/TaskListComponent'

function App() {

  const [state, dispatch] = useReducer(taskReducer, initialState)

  return (
    <>
    <section className='bg-pink-400 p-5 flex justify-center'>
      <h1 className='font-black text-center text-4xl text-white'>TO-DO LIST</h1>
    </section>
    <FormToDo state={state!} dispatch={dispatch}/>
    <TaskListComponent state={state!} dispatch={dispatch}/>
    </>
  )
}

export default App
