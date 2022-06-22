const dbConfig = require('./dbConfig');
const sql = require('mssql');

module.exports.getUserList = async () => {
  try {
    let pool = await sql.connect(dbConfig);
    let userList = await pool.request().execute('wacoal_GetUserList_Web_V1');
    return userList.recordset;
  } catch (error) {
    throw error;
  }
};
