
import React from "react";
import Button from "./Buttons";
import {Edit2} from "lucide-react";

type Props={
  id: number;
handleEdit: (id:number)=> void; 
};

           const UpdateTask: React.FC<Props>=({id,handleEdit })=>{
  return(
             <Button onClick={() => handleEdit(id)} className="ml-2">
        
           <Edit2 size={18} />
    </Button>
  );
};

export default UpdateTask;
