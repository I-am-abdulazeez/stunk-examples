import { useMemo } from "react";
import { chunk } from "stunk";
import { useChunk } from "stunk/react";

type Course = {
  course: {
    courseTitle: string;
    courseContent: string;
  };
};

export default function IsolatedModal({ course }: Course) {
  // You can also hold it with useMemo() - useMemo(() => chunk(false), []);
  // But this is more readable and easier to manage
  const modalState = useMemo(() => chunk(false), []);
  const [isOpen, setIsOpen] = useChunk(modalState);

  const toggleModal = () => setIsOpen((prev) => !prev);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button
        className={`btn btn-sm ${isOpen ? "btn-error" : "btn-primary"}`}
        onClick={toggleModal}
      >
        {isOpen ? `Close ${course.courseTitle}` : course.courseTitle}
      </button>

      {isOpen && (
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
