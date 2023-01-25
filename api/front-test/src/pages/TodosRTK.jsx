import { useRef } from "react";
import { useGetTodosQuery, usePostTodoMutation } from "../services/todos-rtk";

const TodosRTK = () => {
  const { data, error, isLoading } = useGetTodosQuery();
  const [postTodo] = usePostTodoMutation();
  const labelRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!labelRef.current.value || labelRef.current.value === "") {
      alert("Please enter a label");
      return;
    }
    postTodo({
      label: labelRef.current.value,
    });
    labelRef.current.value = "";
  };

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <form
            style={{ marginTop: "40px", marginBottom: "40px" }}
            onSubmit={onSubmitHandler}
          >
            <input type="text" ref={labelRef} placeholder="Enter a label" />
            <input type="submit" value="Save" />
          </form>
          {data.map((todo) => (
            <div key={todo._id}>{todo.label}</div>
          ))}
        </>
      )}
    </>
  );
};

export default TodosRTK;
