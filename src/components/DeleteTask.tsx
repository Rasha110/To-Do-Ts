import React from "react";
import { Trash2 } from "lucide-react";
import Button from "./Buttons";
import type { Task } from "./type";

type Props= {
  task:Task;
  tasks:Task[];
  setTasks:React.Dispatch<React.SetStateAction<Task[]>>;
};

const DeleteTask:React.FC<Props>=({task,tasks,setTasks})=>{
  const handleDelete=()=> {
    setTasks(tasks.filter(t => t.id !== task.id));
  };

  return (
    <Button onClick={handleDelete} className="ml-2">
 <Trash2 size={18} />
    </Button>
  );
};

export default DeleteTask;
