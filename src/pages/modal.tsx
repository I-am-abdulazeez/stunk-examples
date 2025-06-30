import GlobalModal from "@/components/modals/global-modal";
import IsolatedModal from "@/components/modals/isolated-modal";
import { courses } from "@/data";

export default function ModalPage() {
  return (
    <div className="px-5 sm:px-5">
      <h1 className="text-2xl font-bold mb-4 text-left">Isolated Modal</h1>
      <p className="mb-4 text-left">
        This is an example of an isolated modal that can be used in a specific
        context without affecting the global state.
      </p>
      <div className="flex gap-3">
        {courses.map((course, idx) => (
          <IsolatedModal key={idx} course={course} />
        ))}
      </div>
      <h1 className="text-2xl font-bold mt-10 mb-4 text-left">Global Modal</h1>
      <p className="mb-4">
        This is an example of a global modal that can be used across the
        application. It uses a global state to manage its visibility.
      </p>
      <div className="flex gap-3">
        {courses.map((course, idx) => (
          <GlobalModal key={idx} course={course} />
        ))}
      </div>
    </div>
  );
}
