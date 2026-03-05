import React from "react";
import axios from "axios";
import { useState , useEffect,useRef} from "react";
import "./Todo.css";

const Todo=()=>{

    const [todos, settodos]=useState([]);
    const[completed,setcompleted]=useState([]);
    const[id,setid]=useState(null);

const inputref=useRef();

useEffect(()=>{

    const alltodo=async ()=>{
    try{

            const response=await axios.get(
                "http://localhost:5000/api/todos"
            );
            
            const alltodo=response.data;

            settodos(alltodo.filter(todo => !todo.completed));
            setcompleted(alltodo.filter(todo => todo.completed));

        }
        
        catch(error){
            console.log(error)
        }
    };
    alltodo();


},[]);

const handleclick = async () => {

  const text=inputref.current.value.trim();
  if(text==="") return;

  try{

    if(id){

      const response=await axios.put(
        "http://localhost:5000/api/todos/"+id,
        {text}
      );

      settodos(prev =>
        prev.map(todo =>
          todo._id===id ? response.data : todo
        )
      );

      setid(null);

    } 
    else{

      const response=await axios.post(
        "http://localhost:5000/api/todos",
        {text}
      );

      settodos(prev => [...prev,response.data]);
    }

    inputref.current.value="";

  }
  catch(error){
    console.log("Error:",error);
  }
};

const handledelete= async (id)=>{

   try{

    await axios.delete("http://localhost:5000/api/todos/"+id);

    settodos(prev =>
        prev.filter(todo => todo._id!==id)
    );

   
    setcompleted(prev =>
        prev.filter(todo => todo._id!==id)
    );

   }
   catch(error)
   {
    console.log("Error While deleting:",error)
   }
}

 const handlecomplete=async (id)=>{

  try{

    const response=await axios.put(
      "http://localhost:5000/api/todos/"+id+"/complete"
    );

    setcompleted(prev=>[...prev,response.data])


    settodos(prev =>
      prev.filter(todo=>todo._id!==id)
    )
    
  }
  catch(error)
  {
    console.log("Error:",error)
  }
 }

    return(

        <>
        <div className="container">

        
        <h3>Enter Your Todo Here</h3>
        <input type="text" placeholder="Enter your Todo Here" ref={inputref} />

        <button onClick={handleclick}>Add</button>
        

        <div className="todo-list">

        <h1>This is You Todo List</h1>

        <div className="list">
        <ul>

{todos.map((todoo) => (
  <li key={todoo._id} className="todo-item">
    <span className="todo-text">{todoo.text}</span>

   <div className="buttons">

  <button className="edit-btn" onClick={()=>{
    setid(todoo._id);
    inputref.current.value=todoo.text;
  }}>Edit</button>

  <button className="delete-btn" onClick={()=>handledelete(todoo._id)}>Delete</button>

  <button className="complete-btn" onClick={()=>handlecomplete(todoo._id)}>
    Completed
  </button>

</div>
  </li>
))}

</ul>

</div>
        </div>

        <div className="completed-tasks">

        <h1>Completed Tasks List</h1>

        <div className="completed-list">

          <ul>

          {completed.map((todo)=>(
  <li key={todo._id}>
    <span className="todo-text">{todo.text}</span>

    <button className="remove-completed-btn" onClick={()=>handledelete(todo._id)}>
      Remove
    </button>
  </li>
))}

          </ul>

        </div>
        </div>

        </div>
        </>
    );
}

export default Todo;