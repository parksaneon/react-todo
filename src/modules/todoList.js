import { useCallback } from "react";
import axios from "../../node_modules/axios/index";
import { call, put, takeEvery, delay } from "redux-saga/effects";
import { getTodosApi, deleteTodoApi, editTodoApi, makeTodoApi } from "./api";
import { createAction } from "redux-actions";

const tempItem = {
  id: 1,
  text: "예시",
  done: false,
};

const initialState = [tempItem];

// 초기 상태 정의
let nextId = 4;

// Action Type 정의
const TODO_LIST = "TODO/TODO_LIST";
const GET_TODO_LIST = "TODO/GET_TODO_LIST";
const TOGGLE_TODO_ITEM = "TODO/TOGGLE_TODO_ITEM";
const GET_TODO_ERROR = "TODO/GET_TODO_ERROR";

// Action Creator Function
export const getTodo = () => ({
  type: GET_TODO_LIST,
});

export const addTodo = (text) => ({
  type: TODO_LIST,
  todo: {
    id: (nextId += 1),
    text,
  },
});

export const deleteTodo = (text) => ({
  type: TODO_LIST,
  todo: {
    id: (nextId += 1),
    text,
  },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO_ITEM,
  id,
});

// reducer
const todos = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO_LIST:
      return action.todos;
    case TODO_LIST:
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
  console.log("saga start");
  try {
    const todos = yield call(axios.get, "/todos");
    yield put({
      type: GET_TODO_LIST,
      todos,
    });
  } catch (error) {
    console.log(error.message);
  }
}

// 특정 액션 모니터링
export function* watchGetTodos() {
  yield takeEvery(GET_TODO_LIST, getTodosSaga);
}
