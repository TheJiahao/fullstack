import { MouseEventHandler } from "react";

const UserInfo = ({
  username,
  logoutHandler,
}: {
  username: string;
  logoutHandler: MouseEventHandler;
}) => (
  <div>
    {username} logged in
    <button onClick={logoutHandler}>logout</button>
  </div>
);

export default UserInfo;
