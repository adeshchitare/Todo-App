import {useEffect,useState} from "react";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

import api from "./api";

function App(){

const [todos,setTodos]=useState([]);
const [page,setPage]=useState(1);
const [search,setSearch]=useState("");
const [totalPages,setTotalPages] = useState(1);
const[loading, setLoading]= useState(false);

const fetchTodos = async (
    page = 1,
    limit = 5,
    search = ""
) => {
    try {
        setLoading(true);

    const response = await api.get(
        `/todos?page=${page}&limit=${limit}&search=${search}`
    );

    setTodos(response.data.todos);
    setTotalPages(response.data.total_pages);
} catch(error){
    console.log(error);
} finally{
    setLoading(false);
}
};

useEffect(()=>{

fetchTodos(page, 5, search);

},[page]);


const addTodo=async(title)=>{

    try{

await api.post(
"/todos",
{title}
);

fetchTodos();

 } catch(error) {
      console.log(error);
    }
};

if(loading){
    return <h3>Loading...</h3>;
}

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
search={search}
setSearch={setSearch}
/>

<div className="pagination">

<button
className="pageBtn"
onClick={()=>setPage(page-1)}
disabled={page===1}
> 
Previous
</button>

<button
className="pageBtn"
onClick={()=>setPage(page+1)}
disabled={page === totalPages}
> 
Next
</button>

</div>

</div>

);

}

export default App;