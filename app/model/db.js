var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit: 10,
    
    host     : 'bu4pcx41i9rxsnguus2p-mysql.services.clever-cloud.com',
    user     : 'uxyw1knbrsy0eksa',
    password : 'pt6CIZ7XJbjFpukgfwjK',
    database : 'bu4pcx41i9rxsnguus2p'
    // mysql -h bu4pcx41i9rxsnguus2p-mysql.services.clever-cloud.com -u uxyw1knbrsy0eksa -ppt6CIZ7XJbjFpukgfwjK bu4pcx41i9rxsnguus2p
/*
   host     : 'localhost',
   user     : 'root',
   password : 'Fedora12',
   database : 'bu4pcx41i9rxsnguus2p'
   */
   
})
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})
module.exports = pool

