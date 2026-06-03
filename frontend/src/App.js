import { useEffect, useState } from "react";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

import api from "./api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user_id") !== null);
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTodos = async (page = 1, limit = 5, search = "") => {
    try {
      setError("");
      setLoading(true);

     

     const userId = localStorage.getItem("user_id");

      const response = await api.get(
     `/todos?user_id=${userId}&page=${page}&limit=${limit}&search=${search}`);

      setTodos(response.data.todos);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log(error);
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(page, 5, searchTerm);
  }, [page, searchTerm]);

  const addTodo = async (title) => {
    try {
      await api.post("/todos", { title });

      fetchTodos(page, 5, search);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Todo App</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <TodoForm addTodo={addTodo} />

      <TodoList
        todos={todos}
        fetchTodos={fetchTodos}
        search={search}
        setSearch={setSearch}
        page={page}
        loading={loading}
      />

      <div className="pagination">
        <button
          className="pageBtn"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <p>
          page {page} of {totalPages}
        </p>

        <button
          className="pageBtn"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
