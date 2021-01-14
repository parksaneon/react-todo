import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todos from "../components/todo";
import { addTodo, toggleTodo, TODO_LIST, getTodo } from "../modules/todoList";

function TodosContainer() {
  const [] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodo());
  }, []);

  const todos = useSelector((state) => state.todos);
  console.log(todos);
  const onCreate = (text) => dispatch(addTodo(text));
  const onToggle = useCallback((id) => dispatch(toggleTodo(id)), [dispatch]);

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
}

export default TodosContainer;
