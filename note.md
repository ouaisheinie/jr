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

很多情况下，类型别名 type 和 interface 是可以互换的

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

## id-select 组件里面有能学习的

## as const 后,类型里面就是定值了

## Partial 类型 要去看看

## useEffect 一定要在顶层，在 dom 中类似 onChange，onClick 事件等调用 hook 时，可以在 hook 里返回要用的方法，然后再到顶层去获取后再使用

-. util/projects 的 useEditProjects 结合 project-list/list.tsx 有柯里化的应用
-. useState 传入函数的时候，会直接运行函数(具体原因是 react 的 initialState 这个惰性初始的特性，react 会认为我们传入函数是直接执行的，不会去保存这个函数读索引)。可以像下面这样用，就可以保存住函数了。

```typescript
const [callback, setCallback] = useState(() => () => {
  alert("init");
});

setCallback(() => () => alert("update"));
```

上面这样写就可以保存函数了。

-. 也可以用 useRef 来保存函数，useRef 定义的值不是组件的状态，只是一个普通的变量，更新它不会让组件重新渲染。
-. 适当使用乐观更新
-. 一个非状态的非基本类型，是不可以放在 useEffect 依赖里的，不然会无限循环。
-. useCallback 是一个特殊版本的 useMemo。跟 useMemo 做的事情是一样的。非基本类型使用到 useEffect 的依赖中时，就要用 useMemo，useCallback(专门作用于函数)来作用于这些值，让他们不要在每次渲染时都进行更新，导致页面重复渲染。
-. setState(prevState => ({ ...prevState, stat })), 在 user-async 里面有这种写法。prevState，此时此刻的 state

## 状态管理方法

1. 如果你只是想避免层层传递一些属性，组件组合 component composition 有时候是一个比 context 更好的解决方案。
