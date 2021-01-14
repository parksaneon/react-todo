import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todos from "../components/todo";
import {
  addTodo,
  toggleTodo,
  TODO_LIST,
  getTodo,
  getTodosSaga,
} from "../modules/todoList";

function TodosContainer() {
  const [] = useState([]);
  const dispatch = useDispatch();

  const getTodos = useCallback(async () => {
    dispatch(getTodo());
  }, [dispatch]);

  const todos = useSelector((state) => state.todos);
  const onCreate = (text) => dispatch(addTodo(text));
  const onToggle = useCallback((id) => dispatch(toggleTodo(id)), [dispatch]);

  return (
    <Todos
      todos={todos}
      onCreate={onCreate}
      onToggle={onToggle}
      getTodos={getTodos}
    />
  );
}

export default TodosContainer;
