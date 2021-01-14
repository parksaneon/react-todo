import { combineReducers } from "redux";
import counter, { counterSaga } from "./counter";
import todos, { todosaga } from "./todoList";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  counter,
  todos,
});

export function* rootSaga() {
  yield all([counterSaga(), todosaga()]);
}

export default rootReducer;
