/**
 * Creates a database that stores to-do lists as tables.
 */

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "fishyfish22",
    host:"localhost",
    port: 5432,
    database: "todo"
});

module.exports = pool;