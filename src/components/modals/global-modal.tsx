import { globalModalState } from "@/store/modal-store";
import { useChunk } from "stunk/react";

type Course = {
  course: {
    courseTitle: string;
    courseContent: string;
  };
};

export default function GlobalModal({ course }: Course) {
  const [openModalId, setOpenModalId] = useChunk(globalModalState);

  const isThisModalOpen = openModalId === course.courseTitle;

  // const openModal = () => setOpenModalId(course.courseTitle);
  const toggleModal = () => {
    setOpenModalId((prev) =>
      prev === course.courseTitle ? undefined : course.courseTitle
    );
  };
  const closeModal = () => setOpenModalId(undefined);

  return (
    <div>
      <button
        className={`btn btn-sm ${
          isThisModalOpen ? "btn-error" : "btn-primary"
        }`}
        onClick={toggleModal}
      >
        {isThisModalOpen ? `Close ${course.courseTitle}` : course.courseTitle}
      </button>

      {isThisModalOpen && (
        <>
          <div className="modal modal-open">
            <div className="modal-box relative">
              <h3 className="text-lg font-bold mb-4">{course.courseTitle}</h3>
              <div className="py-4">
                <p className="text-sm text-gray-600">{course.courseContent}</p>
              </div>
              <div className="modal-action">
                <button className="btn btn-primary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
