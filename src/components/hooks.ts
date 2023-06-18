import { useRef } from "react";
import { FormStore } from "./FormStore";

export function useForm(formStoreApi?: any) {
  const formRef = useRef<any>();

  if (!formRef.current) {
    if (formStoreApi) {
      formRef.current = formStoreApi;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}