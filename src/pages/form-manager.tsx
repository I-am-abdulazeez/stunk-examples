import { useChunk } from "stunk/react";

import Heading from "@/components/shared/heading";
import GoBack from "@/components/shared/go-back";

import {
  formChunk,
  updateField,
  submitForm,
  resetForm,
} from "@/store/form-store";

export default function FormManager() {
  const [form] = useChunk(formChunk);

  return (
    <>
      <Heading text={"Form Manager"} />
      <div className="p-6 max-w-md mx-auto border border-gray-600 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-lg text-left font-medium">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="input input-bordered input-lg w-full"
            placeholder="Olamide"
          />
          {form.errors.name && (
            <p className="text-red-500 text-md text-left">{form.errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-lg text-left font-medium">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="input input-bordered input-lg w-full"
            placeholder="olamide@example.com"
          />
          {form.errors.email && (
            <p className="text-red-500 text-md text-left">
              {form.errors.email}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-lg text-left font-medium">
            Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            className="input input-bordered input-lg w-full"
            placeholder="*******"
          />
          {form.errors.password && (
            <p className="text-red-500 text-md text-left">
              {form.errors.password}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button onClick={submitForm} className="btn btn-primary flex-1">
            Submit
          </button>
          <button onClick={resetForm} className="btn btn-outline flex-1">
            Reset
          </button>
        </div>
      </div>

      <GoBack />
    </>
  );
}
