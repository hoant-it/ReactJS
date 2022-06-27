import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [userList, getUserList] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4444/api').then((result) => {
      // console.log(result.data.data);
      getUserList(result.data.data);
    });
  }, []);

  return (
    <div>
      <h1>home page</h1>
      <ul>{userList.length > 0 && userList.map((item) => <li key={item.UserName}>{item.FullName}</li>)}</ul>
    </div>
  );
}

export default Home;
