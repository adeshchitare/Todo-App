import api from "./api";

function TodoList({ todos, fetchTodos }) {

  const deleteTodo = async(id)=>{
    await api.delete(`/todos/${id}`);
    fetchTodos();
  };

  const editTodo = async(todo)=>{

const updatedTitle = prompt(
"Edit Todo",
todo.title
);

if(updatedTitle){

await api.put(
`/todos/${todo.id}`,
{
title:updatedTitle
}
);

fetchTodos();

}

};

  const completeTodo = async(id)=>{
    await api.patch(`/todos/${id}/complete`);
    fetchTodos();
  };

  return(
    <div>

      {todos.map((todo)=>(

        <div className="todo-item" key={todo.id}>

          <span
className="todo-text"
style={{
   textDecoration:
   todo.completed
   ? "line-through"
   : "none"
}}
>
   {todo.title}
</span>

<div className="button-group">

<button
className="completeBtn"
onClick={()=>completeTodo(todo.id)}
> 
Complete
</button>

<button
className="editBtn"
onClick={()=>editTodo(todo)}
> 
Edit
</button>

<button
className="deleteBtn"
onClick={()=>deleteTodo(todo.id)}
> 
Delete
</button>

</div>
        </div>

      ))}

    </div>
  );
}

export default TodoList;