
import React from "react";

export function Input(props: any) {
    const { value = "", ...otherProps } = props;
    return <input style={{ outline: "none" }} value={value} {...otherProps} />;
}
  