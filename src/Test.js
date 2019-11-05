import React, { useState, useEffect } from 'react';

import API from './API';

export default () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async function fetch() {
      const promise = await API.get('data');
      const { status } = promise;
      if (status === 200) {
        const { data } = promise;
        setBooks(data);
      }
    }());
  }, []);

  return (
    <div>
      <h1>Values</h1>
      {books.map((value) => <h4 key={+value}>{value}</h4>)}
    </div>
  );
};
