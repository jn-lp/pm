const moment = require('moment');
const uuidv4 = require('uuid/v4');
const db = require('../index');

module.exports = {
  async create({username, password}) {
    const text = `INSERT INTO
      users(id, username, user_type, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
			returning *`;
			
    const values = [
      uuidv4(),
			username,
      'MEMBER',
			password,
      moment(new Date()),
      moment(new Date())
    ];

		const { rows } = await db.query(text, values);
		return rows[0]
  },

  async getAll() {
    const findAllQuery = 'SELECT * FROM users';
		const { rows, rowCount } = await db.query(findAllQuery);
		return ({ rows, rowCount });
  },

  async getOne(id) {
    const text = 'SELECT * FROM users WHERE id = $1';
		const { rows } = await db.query(text, [id]);
		if (!rows[0]) {
			return ({'message': 'users not found'});
		}
		return rows[0];
  },

  async update(id, {username, password}) {
    const findOneQuery = 'SELECT * FROM users WHERE id=$1';
    const updateOneQuery =`UPDATE users
      SET username=$1,user_type=$2,password=$3,modified_date=$4
      WHERE id=$5 returning *`;
		const { rows } = await db.query(findOneQuery, [id]);
		if(!rows[0]) {
			return ({'message': 'users not found'});
		}
		const values = [
			username || rows[0].success,
			rows[0].user_type,
			password || rows[0].password,
			moment(new Date()),
			id
		];
		const response = await db.query(updateOneQuery, values);
		return response.rows[0];
  },

  async delete(id) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
		await db.query(deleteQuery, [id]);
		return ({ 'message': 'deleted' });
  }
};
