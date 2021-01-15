import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todos from "../components/todo";
import { addTodo, toggleTodo, getTodo, deleteTodo } from "../modules/todoList";

function TodosContainer() {
  const [] = useState([]);
  const dispatch = useDispatch();

  const getTodos = useCallback(async () => {
    dispatch(getTodo());
  }, [dispatch]);

  const todos = useSelector((state) => state.todos);
  const onCreate = (text) => dispatch(addTodo(text));
  const onToggle = useCallback((id, done) => dispatch(toggleTodo(id, done)), [
    dispatch,
  ]);
  const onDelete = useCallback((id) => dispatch(deleteTodo(id)), [dispatch]);

  return (
    <Todos
      todos={todos}
      onCreate={onCreate}
      onToggle={onToggle}
      getTodos={getTodos}
      deleteTodo={onDelete}
    />
  );
}

export default TodosContainer;
