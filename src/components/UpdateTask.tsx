import React, {useState} from "react";
import {Edit2} from "lucide-react";
import Button from "./Buttons";
import type {Task} from "./type";

type Props = {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const UpdateTask: React.FC<Props> = ({task,tasks,setTasks})=> {
  const [editing,setEditing] = useState(false);
  const [newTitle,setNewTitle] = useState(task.title);

  const handleUpdate=()=>{
if (newTitle.trim() === "")return;
    setTasks(tasks.map(t=>t.id === task.id ? { ...t,title:newTitle } : t));
    setEditing(false);
  };

  if (editing){
    return (
      <div className="flex ml-2">
        <input
          value={newTitle}
          onChange={(e)=>setNewTitle(e.target.value)}
          className="p-1 rounded text-white"
        />
        <Button onClick={handleUpdate} className="ml-1 ">
          Save
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => setEditing(true)} className="ml-2">
      <Edit2 size={18} />
    </Button>
  );
};

export default UpdateTask;
