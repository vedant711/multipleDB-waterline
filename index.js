const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config({path:path.resolve(__dirname,'./.env')});
var bodyParser = require('body-parser')
const cors = require('cors');
var Waterline = require('waterline');
var waterline = new Waterline();
const {bookSchema,bookMongoSchema} = require('./models/books')
const config =  require('./config/datastore');

//registering the model
waterline.registerModel(bookSchema)
waterline.registerModel(bookMongoSchema)

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
//initializing the waterline service
waterline.initialize(config,(err,data)=>{
    if (err) {
        console.log(err)
        return;
    } else {
        global.models = app.models = data.collections;
        app.connections = data.connections;
        app.use(require('./routes/apis'))
        app.listen(process.env.PORT, ()=> {console.log(`Listening on ${process.env.PORT}`)})
    }
})
