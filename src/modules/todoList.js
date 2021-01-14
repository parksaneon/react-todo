import { useCallback } from "react";
import axios from "../../node_modules/axios/index";
import { call, put, takeEvery, delay } from "redux-saga/effects";
import { getTodosApi, deleteTodoApi, editTodoApi, makeTodoApi } from "./api";
import { createAction } from "redux-actions";

// const tempItem = {
//   id: 1,
//   text: "예시",
//   done: false,
// };

// const initialState = [tempItem];

const initialState = {};

// 초기 상태 정의
let nextId = initialState.length + 1;

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
      return {
        todos: [action.payload],
        loading: false,
        error: null,
      };
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
  try {
    yield delay(2000);

    const todos = yield call(getTodosApi);
    console.log(todos);
    yield put({
      type: GET_TODO_LIST,
      payload: todos,
    });
  } catch (error) {
    yield put({
      type: GET_TODO_ERROR,
      error: true,
      payload: error,
    });
  }
}

export const getTodosSagaStart = createAction(GET_TODO_LIST);

export function* booksSaga() {
  yield takeEvery(GET_TODO_LIST, getTodosSagaStart);
}

// 특정 액션 모니터링
export function* todosaga() {
  yield takeEvery(GET_TODO_LIST, getTodosSaga);
}
