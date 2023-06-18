import React from "react";
import _Form from "./Form";
import { useForm } from "./hooks";

const InternalForm = React.forwardRef(_Form);
type InternalFormType = typeof InternalForm;

interface RefFormType extends InternalFormType {
    useForm: typeof useForm;
}

const Form: RefFormType = InternalForm as RefFormType;

export { Form, useForm };
export * from "./Input";
export * from "./Field";
