const mysql = require('mysql'),
  db_info = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Qwer1595@!',
    database: 'codeName',
  },
  pool = mysql.createPool(db_info)

module.exports = (callback) => {
  pool.getConnection((err, conn) => {
    if (!err) {
      callback(conn)
    }
  })
}
