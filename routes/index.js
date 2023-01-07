const express =require("express");
const router= express.Router();

router.post("/link",(req,res)=>{
console.log(req.body);
res.json({status:"ok"})
}); 

module.exports=router;