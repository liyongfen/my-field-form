import React, { Component } from "react";
import { FormContext } from "./FormContext";

interface Props {
    name: string;
    label: string;
    rules: any[];
    children: any;
}


export class Field extends Component<Props> {
  static contextType = FormContext;
  unRegister: any = null;
  // 将接收的组件变为受控组件
  getControlled = () => {
    const { name } = this.props;
    const { setFieldValue, getFieldValue } = this.context as any;

    return {
      value: getFieldValue(name),
      onChange(e: any) {
        const newVal = e.target.value;
        setFieldValue(name, newVal);
      },
    };
  };

  // 数据改变时，更新组件的方法
  onStoreChange = () => {
    this.forceUpdate();
  };

  componentDidMount() {
    // 在 store 中注册 field 组件的 实例
    this.unRegister = (this.context as any).registerField(this);
  }

  // 注销 store 中的组件实例
  componentWillUnmount() {
    this.unRegister();
  }
  render() {
    const controlledChild = React.cloneElement(
      this.props.children,
      this.getControlled()
    );
    return controlledChild;
  }
}