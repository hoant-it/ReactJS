const sql = require('mssql');
const sqlConfig = require('../dbConfig');

const data_Tree = (arr, parent_id = '0', level = 0) => {
  let menuTree = [];

  arr.forEach((element) => {
    let ob = {};
    if (element.parent_id === parent_id) {
      ob.title = element.title;
      ob.id = element.id;
      if (element.href !== '') {
        ob.path = element.href;
      }
      let child = data_Tree(arr, element.id, level + 1);
      if (child.length > 0) {
        ob.childrens = child;
      }
      menuTree.push(ob);
    }
  });
  return menuTree;
};

module.exports.sp_Wacoal_LoadMenuWeb_V1 = async () => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .input('IDAuthorization', sql.BigInt, 34)
      .input('UserInGroupID', sql.BigInt, 106)
      .execute('sp_Wacoal_LoadMenuWeb_V1');
    return data_Tree(result.recordset);
  } catch (error) {
    throw error;
  }
};
