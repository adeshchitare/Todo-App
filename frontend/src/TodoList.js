import api from "./api";
import { useState } from "react";

function TodoList({ todos, fetchTodos, search, setSearch }) {

    
    const [message, setMessage] = useState("")

    const searchTodo = async () => {
        fetchTodos(1, 5, search);
    };

    const deleteTodo = async (id) => {

        try{

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this todo?"
        );

        if (!confirmDelete) return;

        await api.delete(`/todos/${id}`);

        setMessage("Todo deleted successfully");
        console.log("message set");

        setTimeout(() => {
            fetchTodos(1, 5, search);
            setMessage("");

        }, 3000);

    } catch(error) {
        console.log(error);
    }
    };

    const editTodo = async (todo) => {

        try {

        const updatedTitle = prompt(
            "Edit Todo",
            todo.title
        );

        if (updatedTitle) {

            await api.put(
               `/todos/${todo.id}`,
                {
                    title: updatedTitle
                }
            );

            fetchTodos(1, 5, search);

        }} catch(error){
            console.log(error);
        }
        }
    

   const completeTodo = async (id) => {
    try {
        await api.patch(`/todos/${id}/complete`);
        fetchTodos(1, 5, search);
    }catch (error) {
        console.log(error);
    }
   };

    return (

        <div>

            {message && (<p style={{color: "green"}}>
                {message}
                </p>
                )}

            {/* Search UI */}

            <div style={{ marginBottom: "20px" }}>

                <input
                    type="text"
                    placeholder="Search todo..."
                    value={search}
                    onChange={(e)=>
                        setSearch(e.target.value)
                    }
                    
                />

                <button 
                className="searchBtn"
                onClick={()=>fetchTodos(1,5,search)}>
                    Search
                </button>

            </div>

            {todos.length === 0 ? (

                <div
                    style={{
                        textAlign: "center",
                        padding: "20px"
                    }}
                >
                    <h3>No Todos Found</h3>

                    <p>
                        Add a new todo to get started 
                    </p>

                </div>

            ) : (

                todos.map((todo) => (

                    <div
                        className="todo-item"
                        key={todo.id}
                    >

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
                                onClick={() =>
                                    completeTodo(todo.id)
                                }
                                disabled={todo.completed}
                            >
                                {
                                    todo.completed
                                        ? "Completed"
                                        : "Complete"
                                }

                            </button>

                                                    <button
                                className="editBtn"
                                onClick={() => editTodo(todo)}
                            >
                                Edit
                            </button>

                            <button
                                className="deleteBtn"
                                onClick={() => deleteTodo(todo.id)}
                            >
                                Delete
                            </button>
                        </div>

                    </div>

                ))

            )}

        </div>
    );

}
export default TodoList;