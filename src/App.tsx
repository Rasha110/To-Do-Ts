import { useEffect, useState } from 'react'
import React from 'react';
import './App.css'
import * as yup from "yup";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
type Task = {
  id: number,
  title:string,
  isCompleted: boolean,

}
type formInputs={
  title:string;
}
const schema=yup.object({title:yup.string().required("title is required!")});


function App() {

const {register,handleSubmit,setValue,reset,formState:{errors},}=useForm<formInputs>({resolver:yupResolver(schema)})

  const [tasks, setTasks] = useState<Task[]>(()=> 
    
    {const saved=localStorage.getItem("tasks");
  return saved ? JSON.parse(saved):[];})

  
  const [editing,setEditing]=useState(false);
  const [editId,setEditId]=useState<number |null>(null);


 
useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks]);

 const onSubmit =(data:formInputs) => {
    if (editing && editId !== null) {
      setTasks(tasks.map((task) =>
        task.id===editId?{...task,title:data.title}:task
      ));
      setEditing(false);
      setEditId(null);
    } else {
      setTasks([...tasks,{id:Date.now(),title:data.title,isCompleted:false}]);
    }
    reset();
  };

  const handleEdit=(id:number)=>{
const editTask=tasks.find((task)=>task.id===id);
if(editTask){
setValue('title',editTask.title);
setEditing(true);
setEditId(id);
}
  }

const handleDelete=(id:number)=>{
  setTasks(tasks.filter((task)=>task.id!==id));

}
const complete=(id:number)=>{
  setTasks(tasks.map((task)=>
  task.id ===id ? {...task,isCompleted:!task.isCompleted}:task
  ))
}
  
  return (
    <>
      <div className='flex flex-col justify-center items-center min-h-screen '>
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-10">
          To-Do App
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-md w-full'>
          <label className='text-gray-700 mb-3 mt-10' htmlFor='add'>Write your task</label>
          <input {...register('title')} id='addTask' placeholder='Add your task' 
          className=' border p-3' />
          {errors.title && (<p className='text-red-500 text-sm'>{errors.title.message}</p>)}
        
          <button
  type='submit'
  className="bg-blue-400 p-2 rounded-lg mt-5"
>
  {editing ? "Update": "Add"}
</button>
          <ul className='mt-5'>
            {tasks.map((task) => (
              <li className='flex flex-row mt-5 bg-blue-300 p-3' key={task.id}>
                <span onClick={()=>{complete(task.id)}} className={`flex ${task.isCompleted ? 'line-through text-gray-500': 'text-gray-800'}`}>{task.title}</span>
              

              <svg onClick={()=>handleEdit(task.id)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ml-auto flex gap-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0l-2.695 2.695m-2.13 2.13l-2.695 2.695m-2.13-2.13l-2.695 2.695M6 18l.8-2.685a4.5 4.5 0 011.13-1.897L16.862 4.487m0 0l-2.695 2.695m-2.13 2.13l-2.695 2.695"/>
            </svg>
        
            <svg onClick={()=>handleDelete(task.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
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
