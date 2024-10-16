import "./App.css";
import List from "./components/ListContainer/List";

function App() {
  const list = ["list 1", "list 2", "list 3", "list 4", "list 5"];

  return (
    <div>
      <List items={list} />
    </div>
  );
}

export default App;
