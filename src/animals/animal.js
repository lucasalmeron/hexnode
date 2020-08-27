AnimalModel = {}

const setModel = (dbmodel) => {
    AnimalModel = dbmodel
}

class Animal {

    constructor(id,name,age,type){
        this.id = id;
        this.name = name;
        this.age = age;
        this.type = type;
    }

    validate(){
        if (typeof this.name != 'string') {
            throw new Error('name must be string');
        }
        if (typeof this.type != 'string') {
            throw new Error('name must be string');
        }
        if (typeof this.age != 'number') {
            throw new Error('name must be number');
        }
    }

    getAnimal() {
        return this
    }

    async getDBList() {
        try {
            const list = await AnimalModel.list()
            return list
        }catch(error){
            console.log(error)
            throw error;
        }
    }

    async save() {
        try {
            const animalSaved = await AnimalModel.new(this)
            this.id = animalSaved._id;
            return animalSaved
        }catch(error){
            console.log(error)
            throw error;
        }
        
    }
}

module.exports = {Animal, setModel}