import { Layers, Globe } from "lucide-react";
import GlobalModal from "@/components/modals/global-modal";
import IsolatedModal from "@/components/modals/isolated-modal";
import Heading from "@/components/shared/heading";
import GoBack from "@/components/shared/go-back";
import { courses } from "@/data";

export default function ModalPage() {
  return (
    <div className="min-h-screen bg-base-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <Heading text="Modals" />

        {/* Isolated Modal Section */}
        <div className="card bg-base-200 border border-base-300 mb-6">
          <div className="card-body p-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Layers className="w-6 h-6 text-[#2af4c2]" />
              Isolated Modal
            </h2>
            <p className="mb-4 opacity-70 text-left">
              Each modal maintains its own independent state. Multiple modals
              can be open simultaneously without affecting each other.
            </p>
            <div className="flex flex-wrap gap-3">
              {courses.map((course, idx) => (
                <IsolatedModal key={idx} course={course} />
              ))}
            </div>
          </div>
        </div>

        {/* Global Modal Section */}
        <div className="card bg-base-200 border border-base-300">
          <div className="card-body p-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Globe className="w-6 h-6 text-[#2af4c2]" />
              Global Modal
            </h2>
            <p className="mb-4 opacity-70 text-left">
              Shared state across the application. Only one modal can be open at
              a time, managed by global state.
            </p>
            <div className="flex flex-wrap gap-3">
              {courses.map((course, idx) => (
                <GlobalModal key={idx} course={course} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <GoBack />
        </div>
      </div>
    </div>
  );
}
