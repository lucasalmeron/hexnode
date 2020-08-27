const express = require('express')
const http = require('http')
const mongoose = require('mongoose')

class Server {
    
    constructor(port){
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));

        this.port = process.env.port || port;
        this.server = http.createServer(this.app)
        
        
        this.startServer()
    }

    async startServer(){
        await this.initMongoDB()
        this.loadRoutes()

        this.server.listen(this.port,() => {
            var date = new Date();
            console.log(`SERVER STARTED ON PORT: ${this.port} at => ${date}`);
        })  
    }

    initMongoDB(){
        return new Promise(async (resolve,reject)=> {
            try {
                const connection = await mongoose.connect(process.env.mongoURI || 'mongodb://localhost/animals',{ 
                    useNewUrlParser: true,
                    useFindAndModify: false,
                    useUnifiedTopology: true
                })
                console.log("DB Connected")
                //load model
                const animalMongooseModel = require('../animals/db/model')
                //init model
                animalMongooseModel.initAnimalModel(connection)


                
                resolve()
            }catch(error) {
                console.log(error);
                reject(error);
            };
        }); 
    }

    loadRoutes(){
        //this.app.use(isAuthenticated);
        const { router }= require('../animals/handler')
        this.app.use('/animals',router);
        //this.app.use(ErrorHandler);
        
    }
}

new Server(3000)