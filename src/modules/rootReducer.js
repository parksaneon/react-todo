import { combineReducers } from "redux";
import counter, { counterSaga } from "./counter";
import todos, {
  watchAddTodos,
  watchDelTodos,
  watchGetTodos,
  watchToggleTodos,
} from "./todoList";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  counter,
  todos,
});

export function* rootSaga() {
  yield all([
    counterSaga(),
    watchGetTodos(),
    watchAddTodos(),
    watchDelTodos(),
    watchToggleTodos(),
  ]);
}

export default rootReducer;
