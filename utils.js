function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        console.log("Unauthorized user");
        res.send({error: "Unauthorized"});
    }
}

module.exports.checkAuthentication = checkAuthentication;