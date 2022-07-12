import useSWR from "swr";

import { fetchUsers } from "services/fetch-users";

export const useUsers = () => {
  const { data, error } = useSWR("/users", fetchUsers);

  return {
    data,
    error,
    loading: !data && !error,
  };
};
