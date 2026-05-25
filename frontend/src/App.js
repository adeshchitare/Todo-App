import {useEffect,useState} from "react";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

import api from "./api";

function App(){

const [todos,setTodos]=useState([]);
const [page,setPage]=useState(1);

const fetchTodos=async()=>{

const response=await api.get(
`/todos?page=${page}`
);

setTodos(response.data);

};

useEffect(()=>{

fetchTodos();

},[page]);


const addTodo=async(title)=>{

await api.post(
"/todos",
{title}
);

fetchTodos();

};


return(

<div className="container">

<h1>
Todo App
</h1>

<TodoForm
addTodo={addTodo}
/>

<TodoList
todos={todos}
fetchTodos={fetchTodos}
/>

<div className="pagination">

<button
onClick={()=>setPage(page-1)}
disabled={page===1}
> 
Previous
</button>

<button
onClick={()=>setPage(page+1)}
> 
Next
</button>

</div>

</div>

);

}

export default App;