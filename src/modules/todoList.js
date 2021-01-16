import axios from "../../node_modules/axios/index";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getTodosApi,
  addTodoApi,
  deleteTodoApi,
  toggleTodoApi,
} from "./services/todoService";

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
const DEL_TODO_LIST = "TODO/DEL_TODO_LIST";
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

export const deleteTodo = (id) => ({
  type: DEL_TODO_LIST,
  id,
});

export const toggleTodo = (id, done) => ({
  type: TOGGLE_TODO_ITEM,
  id,
  done: !done,
});

// reducer
const todos = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO_LIST:
      return state;
    case SUCCESS_TODO_LIST:
      return action.todos;
    case ADD_TODO_LIST:
      return state.concat(action.todo);
    case DEL_TODO_LIST:
      return state.filter((todo) => todo.id !== action.id);
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
    const todos = yield call(getTodosApi);
    nextId = todos.length;
    yield put(success(todos));
  } catch (error) {
    console.log(error.message);
  }
}

export function* addTodosSaga({ todo }) {
  try {
    yield call(addTodoApi, todo);
  } catch (error) {
    console.log(error.message);
  }
}

export function* delTodosSaga({ id }) {
  try {
    yield call(deleteTodoApi, id);
  } catch (error) {
    console.log(error.message);
  }
}

export function* toggleTodosSaga({ id, done }) {
  try {
    yield call(toggleTodoApi, id, done);
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
export function* watchDelTodos() {
  yield takeEvery(DEL_TODO_LIST, delTodosSaga);
}
export function* watchToggleTodos() {
  yield takeEvery(TOGGLE_TODO_ITEM, toggleTodosSaga);
}
