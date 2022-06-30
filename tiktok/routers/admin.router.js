const express=require('express')
const router=express.Router();
const userControl=require('../controllers/admin/userlist.control')

router.get('/wacoal_GetUserList_Web_V1',userControl.wacoal_GetUserList_Web_V1)

module.exports=router