import "./App.css";
import CounterContainer from "./containers/counter";
import TodosContainer from "./containers/todo";

function App() {
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

export default App;
