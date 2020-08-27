const animalSchema = require('./schema');
const animal = require('../animal');

class AnimalMongooseModel {
    
    constructor(connection){
        this.model = connection.model('animal',animalSchema,'animals');
        console.log("Animal mongoose's model loaded")
    }

    list() {
        return new Promise(async (resolve,reject) => {
            try{
                const list = await this.model.find({})
                resolve(JSON.parse(JSON.stringify(list)))
            }catch(error){
                console.log(error);
                reject(error)
            }
        })
    }

    findOne(id){
        //this.model.findOne()
    }

    new(animal){
        return new Promise(async (resolve,reject) => {
            try{
                const newAnimal = await this.model.create(animal)
                resolve(newAnimal.toJSON())
            }catch(error){
                console.log(error);
                reject(error)
            }
        })
    }

    update(){

    }

    delete(){

    }
}

AnimalModel = {}

const initAnimalModel = (connection) => {
    //init new model with a connection
    AnimalModel = new AnimalMongooseModel(connection)
    animal.setModel(AnimalModel)
}

module.exports = {AnimalModel,initAnimalModel}