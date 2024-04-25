exports.sendtoken = (employe, statusCode, res) => {
    const token = employe.getjwttoken();
    
    const options ={
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        ),
        httponly:true,
        // secure:true,
    };
    res.status(statusCode)
    .cookie("token",token,options)
    .json({ success:true, id: employe._id,token})
   
};