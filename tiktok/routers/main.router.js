const express = require('express');
const router = express.Router();
const mainControl= require('../controllers/main/main.control')

router.get('/sp_Wacoal_LoadMenuWeb_V1', mainControl.sp_Wacoal_LoadMenuWeb_V1)



module.exports = router;
