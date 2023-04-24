var Waterline = require('waterline');
var waterline = new Waterline();

//MySQL books schema
const books = {
    identity:'books',
    datastore:'mysql',
    primaryKey:'id',
    attributes: {
        id: {
            type: 'number',
            autoMigrations: {autoIncrement: true}
        },
        name:{type:'string',required:true},
        author:{type:'string',required:true},
        ISBN:{type:'number',required:true},
        publisher:{type:'string',required:true}
    
    }

}

//MongoDB Books Schema
const booksMongo = {
    identity:'booksMongo',
    datastore:'mongo',
    primaryKey:'id',
    attributes:{
        id: {
            type: 'string',
            columnName:'_id'
        },
        name:{type:'string',required:true},
        author:{type:'string',required:true},
        ISBN:{type:'number',required:true},
        publisher:{type:'string',required:true}
    
    }

} 

var bookSchema = Waterline.Collection.extend(books)
var bookMongoSchema = Waterline.Collection.extend(booksMongo)


module.exports.bookSchema = bookSchema;
module.exports.bookMongoSchema = bookMongoSchema;