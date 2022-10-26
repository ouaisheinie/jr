import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
/* 返回页面url中，指定键的参数值 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams, keys]
    ),
    setSearchParam,
  ] as const;
  // as const 类型里面就是定值了
};
