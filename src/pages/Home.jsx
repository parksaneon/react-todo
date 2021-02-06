import { Redirect } from "react-router-dom";
import TodosContainer from "../containers/CounterContainer";
import CounterContainer from "../containers/TodoContainer";

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
