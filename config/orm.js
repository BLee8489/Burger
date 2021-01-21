const connection = require('./connection.js');

// Helper function for SQL syntax to add question marks in query
const printQuestionMarks = (num) => {
	const arr = [];

	for (let i = 0; i < num; i++) {
		arr.push('?');
	}

	return arr.toString();
};

// Object for all our SQL statement functions.
const orm = {
	all(tableInput, cb) {
		const queryString = `SELECT * FROM ${tableInput};`;
		connection.query(queryString, (err, result) => {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},
	create(table, cols, vals, cb) {
		let queryString = `INSERT INTO ${table}`;

	queryString += ' (';
    queryString += cols.toString();
    queryString += ') ';
    queryString += 'VALUES (';
    queryString += printQuestionMarks(vals.length);
    queryString += ') ';

		connection.query(queryString, vals, (err, result) => {
			if (err) {
				throw err;
			}

			cb(result);
		});
	},
	update(table, objColVals, condition, cb) {
		let queryString = `UPDATE ${table}`;

		queryString += ' SET ';
		queryString += objColVals;
		queryString += ' WHERE ';
		queryString += condition;

		connection.query(queryString, (err, result) => {
			if (err) {
				throw err;
			}

			cb(result);
		});
	},
	delete(table, condition, cb) {
    let queryString = `DELETE FROM ${table}`;
    queryString += ' WHERE ';
    queryString += condition;
        
		connection.query(queryString, (err, result) => {
			if (err) {
				throw err;
			}

			cb(result);
		});
	},
};

module.exports = orm;