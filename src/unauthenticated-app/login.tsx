import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButotn } from "./index";
import { useAsync } from "utils/use-async";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  // 点击登录
  const handleSubmit = (values: { username: string; password: string }) => {
    run(login(values).catch(onError));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id="username" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButotn loading={isLoading} htmlType="submit" type="primary">
          登录
        </LongButotn>
      </Form.Item>
    </Form>
  );
};
