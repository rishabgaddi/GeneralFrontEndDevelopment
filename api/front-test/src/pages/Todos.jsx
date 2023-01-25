import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import NewTodo from "../components/NewTodo";
import { getTodos } from "../services/todos";

dayjs.extend(relativeTime);

export const Todos = () => {
  const { token } = useSelector((state) => state.auth);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await getTodos(token);
      if (res.status && res.status === 200) {
        setTodos(res.data);
      }
    };
    token && fetchTodos();
  }, [token]);

  return (
    <>
      <h1 className="title">Todos</h1>
      <NewTodo />
      {todos && todos.length > 0 && (
        <div className="todos">
          {todos.reverse().map((todo) => (
            <div className="todo" key={`todos-${todo._id}`}>
              <div className="label">{todo.label}</div>
              <div className="description">{todo.description}</div>
              <div className="time">{dayjs(todo.created_at).fromNow()}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
