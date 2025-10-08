import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Index = lazy(() => import("@/pages"));
const Counter = lazy(() => import("@/pages/counter"));
const Todo = lazy(() => import("@/pages/todo"));
const ThemeSwitcher = lazy(() => import("@/pages/theme-switcher"));
const AuthManager = lazy(() => import("@/pages/auth-manager"));
const ShoppingCart = lazy(() => import("@/pages/cart"));
const UsersList = lazy(() => import("@/pages/users-list"));
const FormManager = lazy(() => import("@/pages/form-manager"));
const NotifyExample = lazy(() => import("@/pages/noti-example"));
const MultiStepWizard = lazy(() => import("@/pages/multi-step-wizard"));
const Kanban = lazy(() => import("@/pages/kanban"));
const ModalPage = lazy(() => import("@/pages/modal"));
const PaginatedUserList = lazy(() => import("@/pages/users-paginated"));
const InfiniteScrollPosts = lazy(() => import("@/pages/infinite-posts"));
const CountryStatePicker = lazy(() => import("@/pages/country-state-picker"));

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
      <Route path="/users-infinite" element={<InfiniteScrollPosts />} />
      <Route path="/country-state-picker" element={<CountryStatePicker />} />
    </Routes>
  );
}

export default App;
