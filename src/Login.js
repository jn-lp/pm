import React, { useState } from 'react';

import API from './API';

export default () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState('');
  const [jwt, setJwt] = useState(localStorage.getItem('jwt') || '');

  const loginApi = async (event) => {
    event.preventDefault();
    const promise = await API.post('login', { username, password });
    if (promise.status === 200) {
      setJwt(promise.data.jwt);
      localStorage.setItem('jwt', promise.data.jwt);
      localStorage.setItem('username', promise.data.user.username);
    }
  };

  return (
    <>
      {jwt ? (
        <span>
          logged as
          {` ${username}`}
        </span>
      )
        : (
          <form onSubmit={loginApi}>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">login</button>
          </form>
        )}
    </>
  );
};
