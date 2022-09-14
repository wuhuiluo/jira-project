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

/*
const debounce = (func, delay) => {
  let timeout;  // 利用闭包保留住了timeout的引用
  return (...param) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function() {
      func(...param);
    }, delay);
  }
}
const log = debounce(() => console.log('call'), 5000)
log()
log()
log()
  ...5s
执行！

debounce 原理讲解：
0s ---------> 1s ---------> 2s --------> ...
    一定要理解：这三个函数都是同步操作，所以它们都是在 0~1s 这个时间段内瞬间完成的；
    log()#1 // timeout#1
    log()#2 // 发现 timeout#1！取消之，然后设置timeout#2
    log()#3 // 发现 timeout#2! 取消之，然后设置timeout#3
            // 所以，log()#3 结束后，就只剩timeout#3在独自等待了
*/
