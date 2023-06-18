import { useEffect } from "react";
import { Field, Form, Input, useForm} from "./components";


export const FieldFormFunc = () => {
  const [form] = useForm();
  const onFinish = (val: any) => console.log("onFinish", val);
  const onFinishFailed = (val: any) => console.log("onFinishFailed", val);

  useEffect(() => {
    form.setFieldsValue({ user: "init user" });
  }, [form]);

  const userRules = [{ required: true, message: "请输入账号" }];
  const pwdRules = [{ required: true, message: "请输入密码" }];
  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Field name="user" label="账号" rules={userRules}>
        <Input placeholder="请输入账号" />
      </Field>
      <Field name="pwd" label="密码" rules={pwdRules}>
        <Input placeholder="请输入密码" />
      </Field>
      <button>Submit</button>
    </Form>
  );
};