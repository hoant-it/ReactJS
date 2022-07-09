const express = require('express');
const router = express.Router();
const userControl = require('../controllers/admin/userlist.control');
const positionControl = require('../controllers/admin/position.control');
const departmentControl=require('../controllers/admin/department.control')

router.get('/wacoal_GetUserList_Web_V1', userControl.wacoal_GetUserList_Web_V1);
router.get('/ListPositions_Load_Web_V1', positionControl.ListPositions_Load_Web_V1);
router.get('/ListDepartment_Load_Web_V1', departmentControl.ListDepartment_Load_Web_V1);
module.exports = router;
