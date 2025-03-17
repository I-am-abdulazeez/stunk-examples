import { useAsyncChunk } from "stunk/react";

import Heading from "@/components/shared/heading";
import GoBack from "@/components/shared/go-back";

import { usersChunk } from "@/store/users-store";

export default function UserList() {
  const { data, loading, error, reload } = useAsyncChunk(usersChunk);

  return (
    <div className="p-4">
      <Heading text="Users List" />
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <ul className="divide-y divide-gray-600 mt-5">
        {data?.map((user) => (
          <li key={user.id} className="py-2">
            {user.name}
          </li>
        ))}
      </ul>

      <button onClick={() => reload()} className="btn btn-primary mt-4">
        Reload
      </button>
      <GoBack />
    </div>
  );
}
