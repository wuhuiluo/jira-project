import { useEffect, useState } from "react";

const isFalsy = (val: unknown) => (val === 0 ? false : !val);

export const cleanObject: object = (obj?: { [key: string]: unknown }) => {
  if (!obj) {
    return {};
  }
  const copyObj = { ...obj };
  Object.keys(copyObj).forEach((key) => {
    const value = copyObj[key];
    console.log(isFalsy(value))
    if (isFalsy(value)) {
      delete copyObj[key];
    }
  });
  return copyObj;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value,setValue] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value,item]),
    clear: () => setValue([]),
    remove: (currentIndex: number) => {
      const newArray = [...value]
      newArray.splice(currentIndex,1)
      setValue(newArray)
    }
  }
}
