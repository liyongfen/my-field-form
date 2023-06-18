import React, { Ref } from "react";
import { FormContext } from "./FormContext";
import { useForm } from "./hooks";

function Form(props: any, ref: Ref<any>) {
  const {children, onFinishFailed, onFinish, form} = props;
  const [formStore] = useForm(form);
  React.useImperativeHandle(ref, () => formStore);

  // 注册 Form 上的回掉函数，数据校验后，提交数据时调用
  formStore.setCallbacks({
    onFinish,
    onFinishFailed,
  });
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      formStore.submit();
    }}>
      <FormContext.Provider value={formStore}>
        {children}
      </FormContext.Provider>
    </form>
  );
}

export default Form;
