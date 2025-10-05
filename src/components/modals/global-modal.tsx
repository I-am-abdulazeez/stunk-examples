import { globalModalState } from "@/store/modal-store";
import { useChunk } from "stunk/react";
import { X, BookOpen, Globe } from "lucide-react";

type Course = {
  course: {
    courseTitle: string;
    courseContent: string;
  };
};

export default function GlobalModal({ course }: Course) {
  const [openModalId, setOpenModalId] = useChunk(globalModalState);

  const isThisModalOpen = openModalId === course.courseTitle;

  const toggleModal = () => {
    setOpenModalId((prev) =>
      prev === course.courseTitle ? undefined : course.courseTitle
    );
  };
  const closeModal = () => setOpenModalId(undefined);

  return (
    <>
      <button
        className={`btn ${
          isThisModalOpen
            ? "btn-error"
            : "bg-[#2af4c2] hover:bg-[#24d4a8] border-none text-neutral-900"
        } gap-2`}
        onClick={toggleModal}
      >
        <BookOpen className="w-4 h-4" />
        {course.courseTitle}
      </button>

      {isThisModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-200 border border-base-300">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[#2af4c2]" />
                {course.courseTitle}
              </h3>
              <button
                onClick={closeModal}
                className="btn btn-ghost btn-sm btn-square"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="divider"></div>

            <div className="py-4">
              <p className="text-base leading-relaxed">
                {course.courseContent}
              </p>
            </div>

            <div className="modal-action">
              <button
                className="btn bg-[#2af4c2] hover:bg-[#24d4a8] border-none text-neutral-900 font-semibold"
                onClick={closeModal}
              >
                Close
              </button>
            </div>

            <div className="alert mt-4">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-[#2af4c2] flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold">Global State</p>
                  <p className="opacity-70">
                    Only one modal can be open at a time
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closeModal}></div>
        </div>
      )}
    </>
  );
}
