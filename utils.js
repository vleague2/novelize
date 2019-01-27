function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.send({error: "Unauthorized"});
    }
}

module.exports = checkAuthentication;