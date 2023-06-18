import React from "react";
import { Component } from "react";
import { Field, Input, Form } from "./components";


export class FieldFormClass extends Component {
    formRef: any = React.createRef();
  
    componentDidMount() {
      this.formRef.current.setFieldsValue({ user: "class form default" });
    }
  
    onFinish = (val: any) => console.log("onFinish", val);
  
    onFinishFailed = (val: any) => console.log("onFinishFailed", val);
  
    render() {
        const userRules = [{ required: true, message: "请输入账号" }];
        const pwdRules = [{ required: true, message: "请输入密码" }];
      return (
        <div style={{ width: 500, margin: "auto" }}>
          <h2>class-my-field-form</h2>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Field name="user" label="账号" rules={userRules}>
              <Input placeholder="请输入账号" />
            </Field>
  
            <Field name="pwd" label="密码" rules={pwdRules}>
              <Input placeholder="请输入密码" />
            </Field>
  
            <button>Submit</button>
          </Form>
        </div>
      );
    }
  }
  