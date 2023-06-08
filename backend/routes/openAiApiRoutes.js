const express=require("express");
const openAiApiController=require("../controllers/openAiApiController");

const router=express.Router();

router.post('/chat', openAiApiController.getResponse);

module.exports=router;