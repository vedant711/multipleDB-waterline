const config = require('../config/datastore');
const router = require('express').Router();

const Books = global.models.books
const BooksMongo = global.models.booksmongo

//Get all books
router.get('/allbooks',async(req,res)=>{
    //finding in mysql
    var allbooks = await Books.find();
    //finding in mongo
    var allMongoBooks = await BooksMongo.find();
    if (allbooks && allbooks.length!==0) res.status(200).json({mysqlBooks:allbooks,mongoBooks:allMongoBooks})
    else res.status(201).json('There are no books available')
})

//Create a new book
router.post('/add-book',async(req,res)=>{
    const {name,author,isbn,publisher} = req.body;
    if(!name||!author||!isbn||!publisher) res.status(201).json('Invalid Input')
    else {
        let query = {where:{name:name,author:author}}
        let books = await Books.find(query)
        let booksMongo = await BooksMongo.find(query)
        if (books.length===0 && booksMongo.length===0) {
            let arr = {}
            const book = {name:name,author:author,ISBN:isbn,publisher:publisher}
            //creating a new book in mysql
            await Books.create(book).then(response=>arr['mysql'] = 'Book added to MySQL').catch(err=>{console.log(err);arr['mysql']='Unable to add book to MySQL'})
            //creating a new book in mongo
            await BooksMongo.create(book).then(response=>arr['mongo'] = 'Book added to Mongo').catch(err=>{console.log(err);arr['mongo']='Unable to add book to Mongo'})
            res.status(200).json(arr)
        } else res.status(201).json('Book Already Exists in MySQL and Mongo')
    }
})

//Edit a book
router.put('/edit-book',async(req,res)=>{
    const {name,author,isbn,publisher,newName} = req.body;
    if(!name||!author||!isbn||!publisher||!newName) res.status(201).json('Invalid Input')
    else {
        let query = {where:{name:newName,author:author}}
        let books = await Books.find(query)
        let booksMongo = await BooksMongo.find(query)
        if (books.length===0 && booksMongo.length===0) {
            arr={}
            const newBook =  {name:newName,author:author,ISBN:isbn,publisher:publisher}
            //editing mysql book
            await Books.update({name:name})
            .set(newBook)
            .then(response=>arr['mysql'] = 'Book updated in MySQL')
            .catch(err=>{console.log(err);arr['mysql']='Unable to update book in MySQL'})
            //editing mongoDB book
            await BooksMongo.update({name:name})
            .set(newBook)
            .then(response=>arr['mongo'] = 'Book updated in Mongo')
            .catch(err=>{console.log(err);arr['mongo']='Unable to update book in Mongo'})
            res.status(200).json(arr)
        } else res.status(201).json('Book Already Exists in MySQL and Mongo')
    }
})

//Delete a book
router.delete('/delete-book',async(req,res)=>{
    const {name,author} = req.body;
    if (!name||!author) res.status(201).json('Invalid Input')
    else {
        let arr = {}
        let query = {where:{name:name,author:author}}
        let books = await Books.find(query)
        let booksMongo = await BooksMongo.find(query)
        if (books.length!==0 && booksMongo.length!==0) {
            const book = {name:name,author:author}
            //deleting from mysql
            await Books.destroyOne(book)
            .then(response=>arr['mysql'] = 'Book deleted from MySQL')
            .catch(err=>{console.log(err);arr['mysql']='Unable to delete book from MySQL'})
            //deleting from mongoDB
            await BooksMongo.destroyOne(book)
            .then(response=>arr['mongo'] = 'Book deleted from Mongo')
            .catch(err=>{console.log(err);arr['mongo']='Unable to delete book from Mongo'})
            res.status(200).json(arr)
        }  else res.status(201).json("Book Doesn't Exists in MySQL and Mongo")
    }
})

module.exports=router;