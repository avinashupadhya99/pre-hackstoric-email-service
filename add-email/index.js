/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
 const mysql = require('mysql');

 const pool = mysql.createPool({
     connectionLimit : 1,
     socketPath: '/cloudsql/' + process.env.CLOUD_SQL_CONNECTION,
     user: process.env.CLOUD_SQL_USER,
     password: process.env.CLOUD_SQL_PASSWORD,
     database: process.env.CLOUD_SQL_DATABASE
 });
 
 exports.storeEmail = (req, res) => {
   const {name, email} = req.body;
   const sql = `INSERT INTO emails (name, email) VALUES ("${name}", "${email}")`;
   pool.query(sql, (err, result) => {
     if(err) {
       console.error(err);
       res.status(500).send(err);
     }
     console.log(result);
     res.status(200).send(`Email ${email} stored successfully`)
   });
 };
 