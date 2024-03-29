import { FormEvent, useState } from "react";

const useField = (type: string) => {
    const [value, setValue] = useState("");

    const onChange = (event: FormEvent) => {
        setValue(event.target.value);
    };

    const reset = () => {
        setValue("");
    };

    return {
        type,
        value,
        onChange,
        reset,
    };
};

export default useField;
