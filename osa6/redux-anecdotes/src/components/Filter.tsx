import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

const Filter = () => {
    const dispatch = useDispatch();

    const handleChange = (event: FormEvent) => {
        const filter = event.target.value;

        dispatch(changeFilter(filter));
    };
    const style = {
        marginBottom: 10,
    };

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    );
};

export default Filter;
