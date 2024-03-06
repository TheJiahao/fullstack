import { FormEvent, useState } from "react";

const useField = (type: string) => {
    const [value, setValue] = useState("");

    const onChange = (event: FormEvent) => {
        setValue(event.target.value);
    };

    return {
        type,
        value,
        onChange,
    };
};

export default useField;
