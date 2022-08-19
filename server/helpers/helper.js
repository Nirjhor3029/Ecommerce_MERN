const serverError = (res,err,custom_msg)=>{
    console.error(err.message);
    res.status(500).send(custom_msg)
}

module.exports = {serverError};