import {
  ReactNode,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

const Toggable = forwardRef(
  (
    props: { buttonLabel: string; children: ReactNode },
    ref: ForwardedRef<unknown>
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
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      );
    }

    return (
      <div>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    );
  }
);

export default Toggable;
