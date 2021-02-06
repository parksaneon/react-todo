import axios from "../../../node_modules/axios/index";

export const requestLogin = async ({ id, pass }) => {
  const res = await axios.get(`/users${id}`);
  if (res.data.pass === pass) {
    return res.data;
  } else {
    throw new Error("계정 번호가 다릅니다.");
  }
};
