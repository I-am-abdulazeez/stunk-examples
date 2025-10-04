import { Route, Routes } from "react-router-dom";

import Index from "@/pages";
import Counter from "@/pages/counter";
import Todo from "@/pages/todo";
import ThemeSwitcher from "@/pages/theme-switcher";
import AuthManager from "@/pages/auth-manager";
import ShoppingCart from "@/pages/cart";
import UsersList from "@/pages/users-list";
import FormManager from "@/pages/form-manager";
import NotifyExample from "@/pages/noti-example";
import MultiStepWizard from "@/pages/multi-step-wizard";
import Kanban from "@/pages/kanban";
import ModalPage from "@/pages/modal";
import PaginatedUserList from "@/pages/users-paginated";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/theme-switch" element={<ThemeSwitcher />} />
      <Route path="/auth-manager" element={<AuthManager />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/users" element={<UsersList />} />
      <Route path="/form-manager" element={<FormManager />} />
      <Route path="/notify" element={<NotifyExample />} />
      <Route path="/multi-step" element={<MultiStepWizard />} />
      <Route path="/kanban" element={<Kanban />} />
      <Route path="/modal" element={<ModalPage />} />
      <Route path="/users-paginated" element={<PaginatedUserList />} />
    </Routes>
  );
}

export default App;
