import { Project } from "../components/screen/panal-list/list";
import { useAsync } from "./use-async";
import { useHttp } from "./http";
import { cleanObject } from "utils";
import { useEffect } from "react";

export const useProject = (param: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    // @ts-ignore
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);

  return result;
};
