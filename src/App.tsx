import { useEffect, useState } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { schema } from './components/schema/schema';

type Task= {
  id: number;
  title: string;
  isCompleted: boolean;
};

type formInputs= {
  title: string;
};

function App() {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<formInputs>({
    resolver: yupResolver(schema)
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved =localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  

  const onSubmit=(data:formInputs) => {
    if (editing && editId !== null) {
      setTasks(tasks.map((task) =>
    task.id === editId ? { ...task, title: data.title } :task
      ));
      setEditing(false);
      setEditId(null);
    } else {
  setTasks([...tasks, {id: Date.now(), title:data.title, isCompleted:false }]);
    }
            reset();
  };

  const handleEdit=(id: number) => {
           const editTask = tasks.find((task) => task.id === id);
    if(editTask){
      setValue('title',editTask.title);
        setEditing(true);
      setEditId(id);
    }
  };

  const handleDelete = (id:number)=>{
    setTasks(tasks.filter((task)=> task.id!==id));
  };

  const complete=(id: number)=>{
    setTasks(tasks.map((task)=>task.id === id ?{ ...task, isCompleted:!task.isCompleted } : task));
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen '>
      <h1 className="text-3xl font-bold text-gray-700 text-center mb-10">To-Do App
      </h1>

      <AddTask   onSubmit={onSubmit}  editing={editing} register={register}    handleSubmit={handleSubmit} 
        errors={errors} 
      />

      <TaskList 
        tasks={tasks} handleEdit={handleEdit} handleDelete={handleDelete}  handleComplete={complete} 
      />
    </div>
  );
}

export default App;
