import axios from "../../node_modules/axios/index";
import { call, put, takeEvery } from "redux-saga/effects";
import { AddTodoApi } from "./api";

const tempItem = {
  id: 1,
  text: "예시",
  done: false,
};

const initialState = [tempItem];

// 초기 상태 정의
let nextId = 0;

// Action Type 정의
const GET_TODO_LIST = "TODO/GET_TODO_LIST";
const SUCCESS_TODO_LIST = "TODO/SUCCESS_TODO_LIST";
const ADD_TODO_LIST = "TODO/ADD_TODO_LIST";
const TOGGLE_TODO_ITEM = "TODO/TOGGLE_TODO_ITEM";
const ERROR_TODO_LIST = "TODO/ERROR_TODO_LIST";

// Action Creator Function
export const getTodo = () => ({
  type: GET_TODO_LIST,
});

export const success = (todos) => ({
  type: SUCCESS_TODO_LIST,
  todos,
});

export const addTodo = (text) => ({
  type: ADD_TODO_LIST,
  todo: {
    id: (nextId += 1),
    text,
    done: false,
  },
});

// export const deleteTodo = (text) => ({
//   type: TODO_LIST,
//   todo: {
//     id: (nextId += 1),
//     text,
//   },
// });

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO_ITEM,
  id,
});

// reducer
const todos = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO_LIST:
      return state;
    case SUCCESS_TODO_LIST:
      return action.todos;
    case ADD_TODO_LIST:
      console.log(state, action.todo);
      return state.concat(action.todo);
    case TOGGLE_TODO_ITEM:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    default:
      return state;
  }
};

export default todos;

// ---------------------------------------------------------- saga

export function* getTodosSaga() {
  try {
    const res = yield call(axios.get, "/todos");
    const todos = res.data;
    nextId = todos.length;
    yield put(success(todos));
  } catch (error) {
    console.log(error.message);
  }
}

export function* addTodosSaga(action) {
  try {
    yield call(AddTodoApi, action.todo);
    nextId += 1;
  } catch (error) {
    console.log(error.message);
  }
}

// 특정 액션 모니터링
export function* watchGetTodos() {
  yield takeEvery(GET_TODO_LIST, getTodosSaga);
}
export function* watchAddTodos() {
  yield takeEvery(ADD_TODO_LIST, addTodosSaga);
}
