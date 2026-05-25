import api from "./api";

function TodoList({ todos, fetchTodos }) {

  const deleteTodo = async(id)=>{
    await api.delete(`/todos/${id}`);
    fetchTodos();
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
            style={{
              textDecoration:
              todo.completed
              ? "line-through"
              : "none"
            }}
          >
            {todo.title}
          </span>

          <button
            className="completeBtn"
            onClick={()=>completeTodo(todo.id)}
          >
            Complete
          </button>

          <button
            className="deleteBtn"
            onClick={()=>deleteTodo(todo.id)}
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  );
}

export default TodoList;