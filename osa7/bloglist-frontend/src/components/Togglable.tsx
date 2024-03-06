import PropTypes from "prop-types";
import {
    ForwardedRef,
    ReactNode,
    forwardRef,
    useImperativeHandle,
    useState,
} from "react";
import { Button } from "react-bootstrap";

const Togglable = forwardRef(
    (
        props: { buttonLabel: string; children: ReactNode },
        ref: ForwardedRef<unknown>,
    ) => {
        const [visible, setVisible] = useState(false);

        const toggleVisibility = () => {
            setVisible(!visible);
        };

        useImperativeHandle(ref, () => {
            return { toggleVisibility };
        });

        if (!visible) {
            return (
                <div>
                    <Button variant="primary" onClick={toggleVisibility}>
                        {props.buttonLabel}
                    </Button>
                </div>
            );
        }

        return (
            <div>
                {props.children}
                <Button variant="secondary" onClick={toggleVisibility}>
                    cancel
                </Button>
            </div>
        );
    },
);

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
