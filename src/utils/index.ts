import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const cleanObject = (object: Object) => {
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    //@ts-ignore
    const value = object[key];
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
};

// // 防抖
// export const debounce = (func, delay) => {
//   let timeout;
//   return (...params) => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(() => {
//       func(...params);
//     }, delay);
//   };
// };

// customhook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, [callback]);
};

export const useDebounce = (value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次value变化以后 设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect被清理的时候运行，相当于上一次useEffect被下次替换，就卸载了，这个return就是在useEffect卸载的时候执行。
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
