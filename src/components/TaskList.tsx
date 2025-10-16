import React from 'react';
import type {Task} from './type';
import DeleteTask from './DeleteTask';
import UpdateTask from './UpdateTask';
import Button from './Buttons';
import {Check} from 'lucide-react';

type Props= {
tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskList: React.FC<Props>=({tasks,setTasks })=> {
  const toggleComplete=(id:number)=> {
   
    setTasks(
        tasks.map(task=> task.id===id ? { ...task, isCompleted: !task.isCompleted }:task));
  };

  return (
    <ul className="mt-5 w-full max-w-md">
      {tasks.map(task=> (
        <li key={task.id} className="flex flex-row mt-5 bg-blue-300 p-3 rounded-lg text-white items-center">
          <span 
            onClick={()=> toggleComplete(task.id)}
    className={`flex flex-1 cursor-pointer ${task.isCompleted ? "line-through text-white/70" : ""}`}
          >
            {task.title}
          </span>

          <Button onClick={()=> toggleComplete(task.id)} className="ml-2">
                          <Check size={18} />
          </Button>

          <UpdateTask task={task} tasks={tasks} setTasks={setTasks} />
          <DeleteTask task={task} tasks={tasks} setTasks={setTasks} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
