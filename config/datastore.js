//Driver configurations for all Databases
const config = {
    adapters:{
        'mysql':require('sails-mysql'),
        'mongodb': require('sails-mongo'),
    },
    datastores: {
        mysql: {
            adapter: 'mysql',
            // host:'localhost',
            // port:3306,
            // user:'root',
            // password:'12345678',
            // database:'mydb'
            url:'mysql://root:12345678@localhost:3306/mydb',
        },
        mongo: {
            adapter: 'mongodb',
            url:'mongodb://127.0.0.1:27017/mydb'
        },
    }
}

module.exports=config;