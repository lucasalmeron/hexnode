const mongoose = require('mongoose')
const { Animal } = require('./animal');
const e = require('express');

describe('animals abm', () => {

    let connection;
    let newAnimal;

    beforeAll(async () => {

        connection = await mongoose.connect(process.env.mongoURI || 'mongodb://localhost/animals',{ 
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log("DB Connected")
        //load model
        const animalMongooseModel = require('../animals/db/model')
        //init model
        animalMongooseModel.initAnimalModel(connection)

    });

    afterAll(async () => {
        await connection.close();
    });

    it('new animal',async (done) => {
        nameExpected = "pepe";
        ageExpected = 55;
        typeExpected = "turtle";

        const animal = new Animal(null,"pepe",55,"turtle")
        const animalSaved = await animal.save()

        //console.log(Object.getOwnPropertyNames(animalSaved._id))

        expect(animalSaved._id["_bsontype"]).toBe("ObjectID")
        expect(animalSaved.name).toBe(nameExpected)
        expect(animalSaved.age).toBe(ageExpected)
        expect(animalSaved.type).toBe(typeExpected)

        newAnimal = animalSaved

        done()
    });
    it.todo("findone animal");
    it.todo("update animal");
    it.todo("delete animal");
})