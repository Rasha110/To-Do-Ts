import React from 'react';
import Button from './Buttons';
type formInputs= {
  title: string;
};

type Props= {
  onSubmit: (data: formInputs) => void;
    editing: boolean;
  register: any;
  handleSubmit: any;
  errors: any;
};

const AddTask:React.FC<Props> = ({onSubmit,editing,register,handleSubmit,errors}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-md w-full'>
      <label className='text-gray-700 mb-3 mt-10' htmlFor='add'>Write your task</label>
        <input {...register('title')} id='addTask' placeholder='Add your task' className='border p-3' />
      {errors.title && (<p className='text-red-500 text-sm'>{errors.title.message}</p>)}

      <Button type="submit" className="bg-blue-400 p-2 rounded-lg mt-5 text-white w-full">
        {editing ? 'Update' : 'Add'}
      </Button>
    </form>
  );
};

export default AddTask;
