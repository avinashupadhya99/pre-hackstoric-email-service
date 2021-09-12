/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
 const sgMail = require('@sendgrid/mail');
 const mysql = require('mysql');
 const fs = require('fs');
 
 const pool = mysql.createPool({
     connectionLimit : 1,
     socketPath: '/cloudsql/' + process.env.CLOUD_SQL_CONNECTION,
     user: process.env.CLOUD_SQL_USER,
     password: process.env.CLOUD_SQL_PASSWORD,
     database: process.env.CLOUD_SQL_DATABASE
 });
 sgMail.setApiKey(process.env.SENDGRID_API_KEY);
 const emailHTML = fs.readFileSync('email.html', 'utf-8');
 
 exports.dailyEmailsPreHackstoric = async (event, context) => {
   pool.query('SELECT * from emails', (err, result) => {
     if(err) {
       console.error(err);
     }
     // console.log(result);
     const resultstring=JSON.stringify(result);
     const resultjson =  JSON.parse(resultstring);
     // console.log(resultjson);
     const emails = resultjson.map(item =>  item['email'] );
     console.log(emails);
     console.log(typeof emailHTML);
     const msg = {
       to: emails,
       from: 'avinash@defhacks.co',
       subject:  'Continue your journey with Dino',
       html: emailHTML,
     }
     sgMail
     .send(msg)
     .then(() => {
       console.log('Email sent');
     })
     .catch((error) => {
       console.error(error)
     })
   });
 };
 