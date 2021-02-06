import React from "react";
import { useDispatch } from "react-redux";
import Login from "../components/Login";
import reqLogin from "../modules/login";

function loginContainer() {
  const dispatch = useDispatch();

  const onSubmit = (e, id, pass) => {
    e.preventDefault();
    dispatch(reqLogin(id, pass));
  };

  return <Login onSubmit={onSubmit} />;
}

export default loginContainer;
