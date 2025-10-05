import { useChunk } from "stunk/react";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  RotateCcw,
  Send,
  AlertCircle,
} from "lucide-react";

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

  const hasErrors = Object.values(form.errors).some((error) => error);

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <div className="container mx-auto max-w-2xl">
        <Heading text="Form Manager" />

        <div className="card bg-base-200 border border-base-300">
          <div className="card-body p-8">
            {/* Form Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-[#2af4c2]/20 rounded-full w-16 h-16 flex items-center justify-center">
                  <UserPlus className="w-8 h-8 text-[#2af4c2]" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2">Create Account</h2>
              <p className="text-base-content/60">
                Fill in your details to sign up
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Name Field */}
              <div className="form-control">
                <div className="mb-2">
                  <span className="font-semibold flex items-center gap-2">
                    <User className="w-4 h-4 text-[#2af4c2]" />
                    Full Name
                  </span>
                </div>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={`input input-bordered w-full ${
                    form.errors.name ? "input-error" : ""
                  }`}
                  placeholder="Enter your full name"
                />
                {form.errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {form.errors.name}
                    </span>
                  </label>
                )}
              </div>

              {/* Email Field */}
              <div className="form-control">
                <div className="mb-2">
                  <span className="font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#2af4c2]" />
                    Email Address
                  </span>
                </div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={`input input-bordered w-full ${
                    form.errors.email ? "input-error" : ""
                  }`}
                  placeholder="your.email@example.com"
                />
                {form.errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {form.errors.email}
                    </span>
                  </label>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control">
                <div className="mb-2">
                  <span className="font-semibold flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#2af4c2]" />
                    Password
                  </span>
                </div>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className={`input input-bordered w-full ${
                    form.errors.password ? "input-error" : ""
                  }`}
                  placeholder="Create a strong password"
                />
                {form.errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {form.errors.password}
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Error Summary */}
            {hasErrors && (
              <div className="alert alert-error mt-4">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Please fix the errors above</p>
                  <p className="text-sm opacity-90">
                    All fields must be valid to submit
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button onClick={resetForm} className="btn btn-outline gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={submitForm}
                className="btn bg-[#2af4c2] hover:bg-[#24d4a8] border-none text-neutral-900 font-semibold gap-2"
              >
                <Send className="w-4 h-4" />
                Submit
              </button>
            </div>

            {/* Info Alert */}
            <div className="alert mt-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#2af4c2] flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold">Form Validation Active</p>
                  <p className="opacity-70">
                    All fields are validated in real-time. Errors will appear as
                    you type.
                  </p>
                </div>
              </div>
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
