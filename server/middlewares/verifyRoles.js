const verifyRoles = (...allowedRoles)=>{
    return (req, res, next )=>{
        console.log(`inside verifyRoles ${allowedRoles}`)
        // if (!req?.roles) return res.status(401)
        const rolesArray = [...allowedRoles];
        console.log(rolesArray)
        console.log(req.roles)
        const result = req.roles.map(role=>rolesArray.includes(role));
        if (!result) return res.status(401);
        next()
    }
}
module.exports = {verifyRoles};