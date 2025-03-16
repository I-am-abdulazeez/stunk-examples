import { Route, Routes } from "react-router-dom";

import Index from "./pages";
import Counter from "./pages/counter";
import Todo from "./pages/todo";
import ThemeSwitcher from "./pages/theme-switcher";
import AuthManager from "./pages/auth-manager";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/theme-switch" element={<ThemeSwitcher />} />
      <Route path="/auth-manager" element={<AuthManager />} />
    </Routes>
  );
}

export default App;
