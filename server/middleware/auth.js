const {cekToken} = require('../helpers/jwt')
const {User, Aset} = require('../models')

function authenticate(req, res, next) {
    //cek token
    try{
        let decoded = cekToken(req.headers.access_token)
        //console.log(decoded)
        User.findOne({where : { email: decoded.email}})
        .then(find => {
           if(!find){
            res.status(401).json({message: 'Please login first'})
        } else {
            //data user
            req.user = find
            next()
        } 
        })  
        .catch(err =>{
            res.status(500).json({message: err.message})
        }) 
    } catch(err){
        res.status(400).json({ message: err.message})
    }
}

function authorize(req, res, next){
        Aset.findOne({ where: { id: req.params.id}})
        .then(aset => {
            if(!aset || aset.user_id !== req.user.id){
                res.status(401).json({ message: 'not your asset'})
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({message : err.meddage})
        })
}
module.exports = {
    authenticate,
    authorize
}