export class FormStore {
  private store: {[key: string]: any} = {}; // 用于存放组件数据
  private fieldEntities: any[] = [];
  private callbacks: any = {};
  // 实现操作状态的方法 get set

  // 多个字段的 set 操作
  setFieldsValue = (newStore: {[key: string]: any}) => {
    this.store = {
      ...this.store,
      ...newStore,
    };
    // 然后更新组件
    this.fieldEntities.forEach((instance) => {
      Object.keys(newStore).forEach((name) => {
        // 只有当 newStore 中的相关 name 的组件的状态发生改变时，才更新对应的组件
        if (name === instance.props.name) {
          instance.onStoreChange();
        }
      });
    });
  };

  // 多个字段的 get 操作
  getFieldsValue = () => ({ ...this.store });

  // 单个字段的 set 操作
  setFieldValue = (field: string, val: any) => {
    this.setFieldsValue({ [field]: val });
  };

  // 单个字段的 get 操作
  getFieldValue = (fieldName: string) => this.store[fieldName];
  

    // 3、注册需要更新的组件实例
  registerField = (fieldInstance: any) => {
    this.fieldEntities.push(fieldInstance);

    // 返回一个函数，用于注销已注册的组件实例，并清空 store 中的相关数据
    return () => {
      this.fieldEntities = this.fieldEntities.filter(
        (instance) => instance !== fieldInstance
      );

      delete this.store[fieldInstance.props.name];
    };
  };

  validate = () => {
    const err: any[] = [];

    this.fieldEntities.forEach((field) => {
      const { name, rules } = field.props;

      const rule = rules && rules[0];
      const value = this.getFieldValue(name);

      if (rule && rule.required && !value) {
        err.push({
          [name]: rule.message,
          value,
        });
      }
    });

    return err;
  };
 
  // 注册回掉函数
  setCallbacks = (newCallbacks: any) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    };
  };
   // 提交所有数据
   submit = () => {
    const err = this.validate();
    const { onFinish, onFinishFailed } = this.callbacks;

    if (err.length) {
      // 数据校验有失败的
      onFinishFailed(err);
    } else {
      //数据校验全部通过
      onFinish({ ...this.store });
    }
  };
  // 暴露操作状态的方法
  getForm = () => ({
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    setFieldValue: this.setFieldValue,
    getFieldValue: this.getFieldValue,
    registerField: this.registerField,
    setCallbacks: this.setCallbacks,
    submit: this.submit,
  });
}
