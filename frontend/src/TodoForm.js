import {useState} from "react";

function TodoForm({addTodo}){

const [title,setTitle]=useState("");
const [error, setError] = useState("")

const submit=(e)=>{

e.preventDefault();

if(title.trim()===""){

setError("Please enter todo")

return;
}

setError("")
addTodo(title)
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

{error && <p style={{ color: "red"}}
>{error}</p>}

<button className="addBtn">
Add
</button>

</form>

);

}

export default TodoForm;