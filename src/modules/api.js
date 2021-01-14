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

// export const deleteTodoApi = async (id) => {
//   try {
//     axios.delete(`/posts/${id}`);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const editTodoApi = async (editTodo) => {
//   try {
//     axios.patch(`/posts/${editTodo.id}`, editTodo);
//   } catch (error) {
//     console.log(error);
//   }
// };
