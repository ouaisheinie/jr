# Auth

1. src 中的 auth-provider 提供 auth 需要的函数
2. 在 src 的 context 文件夹中，auth-context.tsx 定义 context 组件，运用 createContext 创建 context，返回 AuthContext.provider, 利用自定义 hook，useAuth 来使用，后续组件调用 useAuth 就能使用这些功能

只要在顶层组件上面使用了 context 返回的 AppProviders，那么就会给内部的所有组件提供 AuthContext 这个 context 里面的 user, login, logout, register 方法。
只需要调用 useAuth, React.useContext(AuthContext)会返回提供的这些方法，就可以直接拿到使用了。
