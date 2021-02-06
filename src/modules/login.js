import { call, put, takeEvery } from "redux-saga/effects";
import { requestLogin } from "./services/loginService";

// Action
const REQUEST_LOGIN = "LOGIM/REQUEST_LOGIN";
const REQUEST_LOGOUT = "LOGIM/REQUEST_LOGOUT";
const SUCCESS_LOGIN = "LOGIM/SUCCESS_LOGIN";
const FAIL_LOGIN = "LOGIM/FAIL_LOGIN";

// Action Creator
export const reqLogin = (id, pass) => ({
  type: REQUEST_LOGIN,
  id,
  pass,
});

export const reqLoOut = () => ({
  type: REQUEST_LOGOUT,
});

// reducer
const login = (state = null, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return state;
    case REQUEST_LOGOUT:
      return state;
    case SUCCESS_LOGIN:
      return {
        id: action.id,
        pass: action.pass,
      };
    case FAIL_LOGIN:
      return state;
    default:
      return state;
  }
};

export default login;

// redux-saga
export function* requestLoginSaga(action) {
  try {
    yield call(requestLogin, action);
    yield put(reqLogin(action));
  } catch (error) {
    console.log(error);
    yield put(reqLoOut());
  }
}
export function* requestLogOutSaga(params) {
  
}


// 특정 액션 모니터링";
export function watchRequestLogin() {
  yield takeEvery(REQUEST_LOGIN, requestLoginSaga)
}
export function watchRequestLogout() {
  yield takeEvery(REQUEST_LOGOUT, requestLogOutSaga)
}