import axios from "../../../node_modules/axios/index";

export const requestLogin = async (id) => {
  const res = await axios.get(`/users${id}`);
  return res.data;
};
