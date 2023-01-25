import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { postTodos } from "../services/todos";

const NewTodo = () => {
  const { token } = useSelector((state) => state.auth);
  const labelRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    labelRef.current.focus();
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!labelRef.current.value || labelRef.current.value === "") {
      alert("Please enter a label");
      return;
    }
    const res = await postTodos(token, {
      label: labelRef.current.value,
      description: descriptionRef.current.value,
    });
    if (res.status && res.status === 200) {
      labelRef.current.value = "";
      descriptionRef.current.value = "";
      labelRef.current.focus();
    }
    // redirect("/todos");
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <label>Label</label>
        <input type="text" ref={labelRef} placeholder="Enter a label" />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          ref={descriptionRef}
          placeholder="Enter a description"
        />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default NewTodo;
