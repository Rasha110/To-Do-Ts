import React from "react";
import Button from "./Buttons";
import { Check } from "lucide-react";
import DeleteTask from "./DeleteTask";
import UpdateTask from "./UpdateTask";

type Task={
  id: number;
  title: string;
  isCompleted: boolean;
};

type Props = {
  tasks: Task[];
  handleEdit: (id: number)=> void;
  handleDelete: (id: number)=> void;
  handleComplete: (id: number)=> void;
};

const TaskList: React.FC<Props> = ({ tasks, handleEdit, handleDelete, handleComplete }) => {
  return (
    <ul className="mt-5 w-full max-w-md">
      {tasks.map(task => ( <li key={task.id} className="flex flex-row mt-5 bg-blue-300 p-3 rounded-lg text-white items-center">
          
       
          <span
            onClick={() => handleComplete(task.id)}  className={`flex flex-1 cursor-pointer ${task.isCompleted ? "line-through text-white/70" : ""}`}
          >
            {task.title}
          </span>

   
          <Button onClick={() => handleComplete(task.id)} className="ml-2">
            <Check size={18} />
          </Button>

          <UpdateTask id={task.id} handleEdit={handleEdit} />

   

          <DeleteTask id={task.id} handleDelete={handleDelete} />
            </li>
      ))}
             </ul>
  );
};

export default TaskList;
