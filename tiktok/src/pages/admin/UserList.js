import React, { useState, useEffect } from 'react';

import * as UserListServices from '~/services/admin/UserListServices';

function UserList() {
  const [userList, getUserList] = useState([]);
  useEffect(() => {
    const fetchApiUserList = async () => {
      const dataUserList = await UserListServices.wacoal_GetUserList_Web_V1();
      getUserList(dataUserList);
    };

    fetchApiUserList();
  }, []);

  return (
    <div>
      <h1>UserList page</h1>
      <ul>{userList.length > 0 && userList.map((item) => <li key={item.UserName}>{item.FullName}</li>)}</ul>
    </div>
  );
}

export default UserList;
