const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = {
  query: (text, params) =>
    new Promise((resolve, reject) => {
      pool.query(text, params)
				.then(res => void resolve(res))
				.catch(err => void reject(err))
    })
}
