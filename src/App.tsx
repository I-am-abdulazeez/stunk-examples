import { Route, Routes } from "react-router-dom";

import Index from "./pages";
import Counter from "./pages/counter";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/counter" element={<Counter />} />
    </Routes>
  );
}

export default App;
