import axios from "axios";
import React, { useEffect, useState } from "react";

function UserDetails() {
  const [users, setUsers] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:8083/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const tableRow = users.map((user, index) => {
    return (
      <tr key={index}>
        <td>{user.id}</td>
        <td>{user.userName}</td>
        <td>{user.password}</td>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <thead>
          <th>Id</th>
          <th>UserName</th>
          <th>Password</th>
        </thead>
        <tbody>{tableRow}</tbody>
      </table>
    </div>
  );
}

export default UserDetails;
