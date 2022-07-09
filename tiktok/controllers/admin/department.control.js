const db = require('../../dbFile/admin/department.db');

module.exports.ListDepartment_Load_Web_V1 = async (req, res) => {
  try {
    const result = await db.ListDepartment_Load_Web_V1();
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



