const sqlConfig= require('../dbConfig')
const sql=require('mssql')

module.exports.getUserList = async () => {
    try {
      let pool = await sql.connect(sqlConfig);
      let userList = await pool.request().execute('wacoal_GetUserList_Web_V1');
      return userList.recordset;
    } catch (error) {
      throw error;
    }
  };