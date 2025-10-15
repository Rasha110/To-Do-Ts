import { useState } from 'react'
import React from 'react';
import './App.css'
type Task = {
  id: number,
  title: string,
  isCompleted: boolean,

}
function App() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = React.useState<Task[]>([{
    id: 1, title: "made to do list", isCompleted: false
  },])
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-gray-700 text-center mt-10">
          To-Do App
        </h1>
        <form className='flex flex-col max-w-md '>
          <label htmlFor='add'>Write your task</label><br />
          <input value={taskName} onChange={(e) => setTaskName(e.target.value)} type='text' id='addTask' placeholder='Add your task' className='mt-5 border p-3' /><br />
          <button
  onClick={(e)=>{
    e.preventDefault(); 
    setTasks([...tasks, { id: Date.now(), title: taskName, isCompleted: false }]);
    setTaskName(""); 
  }}
  className="bg-blue-400 p-2 rounded-lg mt-5"
>
  Add
</button>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </form>
      </div>
    </>
  )
}

export default App
