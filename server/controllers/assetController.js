const{Aset} = require('../models')

class assetController{
    static getAsset(req, res){
        //method untuk get asset dari db
        Aset.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: 'internal server error'})
        })
    }

    static createAsset(req, res){
        const asetObj = {
            name: req.body.name,
            description: req.body.description,
            user_id : req.user.id
        }
        Aset.create(asetObj)
        .then(dataAset => {
            res.status(201).json({id: dataAset.id, name: dataAset.name, description: dataAset.description})
        })
        .catch(err => {
            res.status(500).json({message: 'internal server error'})
        })
    }

    static deleteAsset(req, res){
        Aset.destroy({where: {id: req.params.id}})
        .then(result =>{
            console.log(result, '>>>>> result');
            if(result == 1){
                res.status(200).json({message: 'Aset has been deleted'})
            } else {
                res.status(404).json({message: 'Aset not found'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'internal server error'})
        })
    }
}

module.exports = assetController