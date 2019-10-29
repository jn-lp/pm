const moment = require('moment');
const uuidv4 = require('uuid/v4');
const db = require('../index');

module.exports = {
  async create({username, password}) {
    const text = `INSERT INTO
      projects(project_id, name, created_date, modified_date)
      VALUES($1, $2, $3, $4)
			returning *`;

    const values = [
      uuidv4(),
			name,
      moment(new Date()),
      moment(new Date())
    ];

		const { rows } = await db.query(text, values);
		return rows[0]
  },

  async getAll() {
    const findAllQuery = 'SELECT * FROM projects';
		const { rows, rowCount } = await db.query(findAllQuery);
		return ({ rows, rowCount });
  },

  async getOne(id) {
    const text = 'SELECT * FROM projects WHERE id = $1';
		const { rows } = await db.query(text, [id]);
		if (!rows[0]) {
			return ({'message': 'projects not found'});
		}
		return rows[0];
  },

  async update(id, {username, password}) {
    const findOneQuery = 'SELECT * FROM projects WHERE id=$1';
    const updateOneQuery =`UPDATE projects
      SET name=$1,modified_date=$2
      WHERE id=$3 returning *`;
		const { rows } = await db.query(findOneQuery, [id]);
		if(!rows[0]) {
			return ({'message': 'projects not found'});
		}
		const values = [
			name || rows[0].name,
			moment(new Date()),
			id
		];
		const response = await db.query(updateOneQuery, values);
		return response.rows[0];
  },

  async delete(id) {
    const deleteQuery = 'DELETE FROM projects WHERE id=$1 returning *';
		await db.query(deleteQuery, [id]);
		return ({ 'message': 'deleted' });
  }
};
