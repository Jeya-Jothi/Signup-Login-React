const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool; // is the correct and expected way to export in CommonJS. “I’m exporting this pool object so other files can import and use it.”
