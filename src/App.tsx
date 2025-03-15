import { Route, Routes } from "react-router-dom";

import Index from "./pages";
import Counter from "./pages/counter";
import Todo from "./pages/todo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}

export default App;
