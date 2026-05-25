import {useState} from "react";

function TodoForm({addTodo}){

const [title,setTitle]=useState("");

const submit=(e)=>{

e.preventDefault();

if(title.trim()===""){

alert("Please enter todo");

return;
}

addTodo(title);

setTitle("");

};

return(

<form onSubmit={submit}>

<input
type="text"
placeholder="Enter Todo"
value={title}
onChange={(e)=>setTitle(
e.target.value
)}
/>

<button className="addBtn">
Add
</button>

</form>

);

}

export default TodoForm;