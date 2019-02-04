function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        console.log("Unauthorized user");
        res.send({error: "Unauthorized"});
    }
}

function sendEmptyFieldError(res) {
    res.status(400);
    res.send("can't be empty");
    console.log("tried to save empty required field");
}

module.exports.checkAuthentication = checkAuthentication;
module.exports.sendEmptyFieldError = sendEmptyFieldError;