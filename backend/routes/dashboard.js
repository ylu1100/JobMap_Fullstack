const router= require("express").Router();
const authorize=require("../middleware/authorization");
const pool=require("../db");


router.get("/",authorize,async(req,res)=>{
    try {
        //res.json(req.user);
        var user=await pool.query("SELECT first_name,last_name,user_email,user_address,isEmployer,address_long,address_lat FROM employeeusers WHERE user_id = $1",[req.user]);
        if(user.rows.length===0){
            user=await pool.query("SELECT user_name,user_email,user_address,isEmployer,address_long,address_lat,job_post FROM employer WHERE user_id = $1",[req.user]);
        }
        
        return res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
router.get("/employerlocs",async(req,res)=>{
    try {
        //res.json(req.user);
        
        var employers=await pool.query("SELECT  job_post,user_name, address_long,address_lat  FROM employer");
        console.log(1)
        
        return res.json(employers.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
router.post("/postjob", authorize,async(req,res)=>{
    try {
        const jobpost=req.body
        const user2=await pool.query("UPDATE employer SET job_post = array_append(job_post,$1) WHERE user_id= $2 RETURNING *",[jobpost,req.user])
        return res.json(user2.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
router.get("/getjobposts", authorize,async(req,res)=>{
    try {
        const user=await pool.query("SELECT job_post FROM employer WHERE user_id = $1",[req.user])
        return res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
module.exports=router;

