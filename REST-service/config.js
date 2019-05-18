const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname);
dotenv.config({ path: root('.env') });

//ORACLE FDB
const oracle_fdb_connection = {
  client: process.env.ORACLE_CLIENT,
  connection: {
    user: process.env.ORACLE_FDB_USER,
    password: process.env.ORACLE_FDB_PASSWORD,
    connectString: process.env.ORACLE_FDB_URL
  }
};
// const oracle_fdb_connection = {
//   client: 'oracledb',
//   connection: {
//     user: 'C##FDBASE',
//     password: 'FDBASE',
//     connectString: 'localhost/orcl'
//   }
// };

//ORACLE DB
const oracle_db_connection = {
  client: process.env.ORACLE_CLIENT,
  connection: {
    user: process.env.ORACLE_DB_USER,
    password: process.env.ORACLE_DB_PASSWORD,
    connectString: process.env.ORACLE_DB_URL
  }
};

//POSTGRES DB
const postgres_connection = {
  client: process.env.POSTGRES_CLIENT,
  connection: {
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    connectString: process.env.POSTGRES_URL
  }
};

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
  ORACLE_FDB_CONNECTION: oracle_fdb_connection,
  ORACLE_DB_CONNECTION: oracle_db_connection,
  POSTGRES_CONNECTION: postgres_connection,
  IS_PRODUCTION: process.env.NODE_ENV === 'production'
};
