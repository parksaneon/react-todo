import { delay, put, takeEvery } from "redux-saga/effects";

// 초기 상태
const initialState = {
  number: 0,
  diff: 1,
};

// Action Type
const SET_DIFF = "COUNTER/SET_DIFF";
const INCREASE = "COUNTER/INCREASE";
const DECREASE = "COUNTER/DECREASE";
const INCREASE_ASYNC = "COUNTER/ASYNC_INCREASE";

// Action Creator
export const setDiff = (diff) => ({
  type: SET_DIFF,
  diff,
});
export const increase = () => ({
  type: INCREASE,
});
export const decrease = () => ({
  type: DECREASE,
});

// Action Creator Saga
export const sagaIncrease = () => ({
  type: INCREASE_ASYNC,
});

// reducer
const counter = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff,
      };

    case INCREASE:
      return {
        ...state,
        number: state.number + state.diff,
      };

    case DECREASE:
      return {
        ...state,
        number: state.number - state.diff,
      };
    case INCREASE_ASYNC:
      return {
        ...state,
        number: (state.number += 10),
      };
    default:
      return state;
  }
};

// 리듀서 함수 export
export default counter;

// redux 비동기 -----------------------------------------------------------------------

// redux-thunk
export const decreaseCountAsyncThunk = () => (dispatch, getState) => {
  setTimeout(() => {
    dispatch({
      type: DECREASE,
    });
  }, 1000);
};

// redux-saga test
function* increaseSaga() {
  yield delay(1000);
  yield put(sagaIncrease());
}

// 특정 액션 모니터링
export function* counterSaga() {
  yield takeEvery(INCREASE, increaseSaga);
}
