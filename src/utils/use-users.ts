import { useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { User } from "components/screen/panal-list/search-panel";
export const useUsers = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client('users'))
  }, []);
  return result;
};
