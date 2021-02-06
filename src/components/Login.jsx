import { useRef } from "react";

const Login = ({ onSubmit }) => {
  const userId = useRef();
  const userPass = useRef();

  return (
    <form>
      <label>아이디</label>
      <input type="text" ref={userId} />
      <label>비밀번호</label>
      <input type="password" ref={userPass} />
      <button
        type="submit"
        onSubmit={(e) => onSubmit(e, userId.value, userPass.value)}
      >
        로그인
      </button>
    </form>
  );
};

export default Login;
