const db = require('../../dbFile/admin/userlist.db');

module.exports.wacoal_GetUserList_Web_V1 = async (req, res) => {
  try {
    const result = await db.getUserList();
    res.json({
      data: result,
    });
  } catch (error) {
    res.json({
      data: [],
      error: error,
    });
  }
};
