const { Router } = require('express')
const { Animal } = require('./animal')

class AnimalsHandler {

    constructor() {
        this.router = Router();
        this.routes();
        console.log('Animals handler loaded')
    }

    routes(){
        this.router.get('/list', this.listAnimals);
        this.router.post('/new', this.newAnimal);
    }

    async listAnimals(req,res,next){
        try{
            const animal = new Animal()
            const list = await animal.getDBList()
            res.status(200).json(list)
        }catch(error){
            console.error(error)
            //next error
        }
    }

    async newAnimal(req,res,next){
        try{
            const {name,age,type} = req.body;
            const animal = new Animal(null,name,age,type)
            animal.validate()
            await animal.save()
            res.status(200).json(animal)
        }catch(error){
            console.log(error)
            //next error
        }
    }

}

const animalsHandler = new AnimalsHandler();
module.exports = animalsHandler;