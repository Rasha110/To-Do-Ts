import  {useEffect,useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { schema} from './components/schema/schema';



import type {Task} from "./components/type";


type formInputs= {
  title:string;
};

function App() {
  const {register,handleSubmit,reset,formState:{errors}} = useForm<formInputs>({
    resolver: yupResolver(schema),
  });

  const [tasks,setTasks]=useState<Task[]>(() => {
    const saved=localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(()=> {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask=(title: string) => {
    setTasks([...tasks, {id: Date.now(),title,isCompleted:false }]);
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h1 className="text-3xl font-bold text-gray-700 text-center mb-10">To-Do App</h1>

      <AddTask 
      onSubmit={(data)=>{ addTask(data.title); reset(); }}
        editing={false}
     register={register}
      handleSubmit={handleSubmit}
      errors={errors}      />

      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
