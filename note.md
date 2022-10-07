# Note

## auth

1. src 中的 auth-provider 提供 auth 需要的函数
2. 在 src 的 context 文件夹中，auth-context.tsx 定义 context 组件，运用 createContext 创建 context，返回 AuthContext.provider, 利用自定义 hook，useAuth 来使用，后续组件调用 useAuth 就能使用这些功能

只要在顶层组件上面使用了 context 返回的 AppProviders，那么就会给内部的所有组件提供 AuthContext 这个 context 里面的 user, login, logout, register 方法。
只需要调用 useAuth, React.useContext(AuthContext)会返回提供的这些方法，就可以直接拿到使用了。

## axios 和 fetch

axios 和 fetch 表现不一样，axios 可以直接在返回状态不为 2xx 的时候抛出异常，fetch 不行。

```typescript
export const useHttp = () => {
  const { user } = useAuth();
  return ([endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
```

## 类型别名

```javascript
type FavoriteNumber = string | FavoriteNumber;
let a: FavoriteNumber = "6";
let a: FavoriteNumber = 6;

type Person = { name: string };
```

```javascript
type Person = {
    name: string
    age: number
}
const xiaoming: Partial<Person> = { name: 'xiaoming' } // 这样少一个age也不报错了
```

很多情况下，类型别名和 interface 是可以互换的

区别

1. interface 做不到定义联合类型，type 可以做到定义联合类型
2. interface 也没法实现 Utility type(实用类型)

## emotion/react

/\*_ @jsxImportSource @emotion/react _/ 可以在组件中使用 css 的样式

## ts 定义对象类型

```javascript
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
```
