import { Redirect } from "react-router-dom";
import TodosContainer from "../containers/counter";
import CounterContainer from "../containers/todo";

function Home() {
  const auth = useSelector((state) => state.auth);
  if (!auth) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <CounterContainer />
      <br />
      <br />
      <br />
      <TodosContainer />
    </div>
  );
}

export default Home;
