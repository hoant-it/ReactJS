const db = require('../../dbFile/main/main.db');

module.exports.sp_Wacoal_LoadMenuWeb_V1 = async (req, res) => {
  try {
    let sidebarMenu = await db.sp_Wacoal_LoadMenuWeb_V1();
    res.json({
      data: sidebarMenu,
    });
  } catch (error) {
    res.json({
      data: [],
      error: error,
    });
  }
};
