import { useState } from "react";
type StatusType = "idle" | "loading" | "error" | "success";

interface State<D> {
  data: D | null;
  error: Error | null;
  status: StatusType;
}

interface defaultConfig {
  throwError: boolean;
}

const defaultState: State<null> = {
  data: null,
  error: null,
  status: "idle",
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: defaultConfig
) => {
  const throwError = { ...initialConfig, initialState };
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initialState,
  });

  const setData = (data: D) => {
    setState({
      data,
      error: null,
      status: "success",
    });
  };

  const setError = (error: Error) => {
    setState({
      error,
      data: null,
      status: "error",
    });
  };

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型的数据");
    }
    setState({
      ...state,
      status: "loading",
    });
    return promise
      .then((data) => {
        setData(data);
        if (throwError.throwError) return data;
      })
      .catch((error) => {
        setError(error);
        if (throwError.throwError) return Promise.reject(error);
        return error;
      });
  };

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    setData,
    setError,
    run,
    ...state,
  };
};
