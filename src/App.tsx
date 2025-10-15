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
  const [editing,setEditing]=useState(false);
  const [editId,setEditId]=useState<number |null>(null);
  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    if(taskName.trim()== "") return;
if(editing && editId !== null){
  setTasks(tasks.map((task)=>task.id===editId ? {...task,title:taskName}:task));
  setEditing(false);
  setEditId(null);
  setTaskName("");
}
else{
  setTasks([...tasks,{id:Date.now(),title:taskName,isCompleted:false},]);
  setTaskName("");
}
  }

  const handleEdit=(id:number)=>{
const editTask=tasks.find((task)=>task.id===id);
if(editTask){
setTaskName(editTask.title);
setEditing(true);
setEditId(id);
}
  }


  
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-gray-700 text-center mt-10">
          To-Do App
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col max-w-md '>
          <label htmlFor='add'>Write your task</label><br />
          <input value={taskName} onChange={(e) => setTaskName(e.target.value)} type='text' id='addTask' placeholder='Add your task' className='mt-5 border p-3' /><br />
          <button
  type='submit'
  className="bg-blue-400 p-2 rounded-lg mt-5"
>
  {editing ? "Update": "Add"}
</button>
          <ul>
            {tasks.map((task) => (
              <li className='flex flex-row' key={task.id}>{task.title} 
              <svg  onClick={()=>handleEdit(task.id)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0l-2.695 2.695m-2.13 2.13l-2.695 2.695m-2.13-2.13l-2.695 2.695M6 18l.8-2.685a4.5 4.5 0 011.13-1.897L16.862 4.487m0 0l-2.695 2.695m-2.13 2.13l-2.695 2.695"/>
            </svg>
        
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        </li>
            ))}
          </ul>   

        </form>
      </div>
    </>
  )
}

export default App
