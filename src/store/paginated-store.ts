import { asyncChunk } from "stunk";

type ApiResponse = {
  results: Array<{
    gender: string;
    name: { title: string; first: string; last: string };
    location: {
      street: { number: number; name: string };
      city: string;
      state: string;
      country: string;
      postcode: string | number;
      coordinates: { latitude: string; longitude: string };
      timezone: { offset: string; description: string };
    };
    email: string;
    login: {
      uuid: string;
      username: string;
      password: string;
      salt: string;
      md5: string;
      sha1: string;
      sha256: string;
    };
    dob: { date: string; age: number };
    registered: { date: string; age: number };
    phone: string;
    cell: string;
    id: { name: string; value: string | null };
    picture: { large: string; medium: string; thumbnail: string };
    nat: string;
  }>;
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
};

export type PaginatedUsersResponse = {
  users: Array<{
    id: string;
    name: string;
    email: string;
    avatar: string;
  }>;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalUsers: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

interface PaginatedUsersParams {
  page: number;
  pageSize: number;
}

export const paginatedUsersChunk = asyncChunk<PaginatedUsersResponse,
  Error,
  PaginatedUsersParams
>(
  async (params: PaginatedUsersParams) => {
    let { page, pageSize } = params;

    if (!page || page < 1) page = 1;
    if (!pageSize || pageSize < 1) pageSize = 5;

    const res = await fetch(
      `https://randomuser.me/api/?results=${pageSize}&page=${page}&seed=pagination`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const json: ApiResponse = await res.json();

    console.log("Fetched data:", json);

    // Transform the data
    const users = json.results.map((user) => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      avatar: user.picture.medium,
    }));

    const simulatedTotalUsers = 100;
    const totalPages = Math.ceil(simulatedTotalUsers / pageSize);

    return {
      users,
      currentPage: json.info.page,
      pageSize,
      totalPages,
      totalUsers: simulatedTotalUsers,
      hasNextPage: json.info.page < totalPages,
      hasPrevPage: json.info.page > 1,
    };
  },
  {
    refresh: {
      staleTime: 30000, // Data is fresh for 30 seconds
      cacheTime: 300000, // Cache data for 5 minutes
    },
    retryCount: 2,
  }
);
