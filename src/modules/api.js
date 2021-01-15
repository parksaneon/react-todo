import axios from "../../node_modules/axios/index";

export const getTodosApi = async () => {
  const result = await axios.get("/todos");
  return result.data;
};

export const addTodoApi = async (newTodo) => {
  try {
    await axios.post("/todos", newTodo);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodoApi = async (id) => {
  try {
    await axios.delete(`/todos/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const toggleTodoApi = async (id, done) => {
  try {
    axios.patch(`/todos/${id}`, { done });
  } catch (error) {
    console.log(error);
  }
};
