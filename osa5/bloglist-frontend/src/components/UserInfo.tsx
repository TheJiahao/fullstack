import { MouseEventHandler } from "react";

const UserInfo = ({
  name,
  logoutHandler,
}: {
  name: string;
  logoutHandler: MouseEventHandler;
}) => (
  <div>
    {name} logged in
    <button onClick={logoutHandler}>logout</button>
  </div>
);

export default UserInfo;
