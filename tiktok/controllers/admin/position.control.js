const db = require('../../dbFile/admin/position.db');

module.exports.ListPositions_Load_Web_V1 = async (req, res) => {
  try {
    const result = await db.ListPositions_Load_Web_V1();
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



