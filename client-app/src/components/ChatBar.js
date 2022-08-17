import React from "react";
import { useEffect, useState } from "react";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      console.log("new user response data", data);
      setUsers(data);
    });
  }, [socket, users]);

  console.log("users", users);
  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {/* <p>User 1</p>
          <p>User 2</p>
          <p>User 3</p>
          <p>User 4</p> */}
          {users.map((data, index) => {
            return <p key={index}>{data.userName}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
