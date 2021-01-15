import React, { useEffect, useState } from "react";

const TodoItem = React.memo(function TodoItem({ todo, onToggle, deleteTodo }) {
  return (
    <li style={{ textDecoration: todo.done ? "line-through" : "none" }}>
      <p onClick={() => onToggle(todo.id, todo.done)}>{todo.text}</p>
      <button onClick={() => deleteTodo(todo.id)}>삭제</button>
    </li>
  );
});

const TodoList = React.memo(function TodoList({ todos, onToggle, deleteTodo }) {
  return (
    <ul>
      {todos.length === 0 && <p>데이터가 없습니다.</p>}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
});

function Todos({ todos, onCreate, onToggle, getTodos, deleteTodo }) {
  const [text, setText] = useState("");
  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    onCreate(text);
    setText("");
  };

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          placeholder="할일을 입력하세요"
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <TodoList todos={todos} onToggle={onToggle} deleteTodo={deleteTodo} />
    </div>
  );
}

export default Todos;
