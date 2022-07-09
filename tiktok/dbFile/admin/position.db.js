const sqlConfig= require('../dbConfig')
const sql=require('mssql')

module.exports.ListPositions_Load_Web_V1 = async () => {
    try {
      let pool = await sql.connect(sqlConfig);
      let userList = await pool.request().execute('ListPositions_Load_Web_V1');
      return userList.recordset;
    } catch (error) {
      throw error;
    }
  };