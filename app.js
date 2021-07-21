const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { request, response } = require('express');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));

//parse application
app.use(bodyParser.json());

//static files
app.use(express.static('piblic'));


//templating engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS


});

//CONNECT TO DB
pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log('Connected as id ' + connection.threadId);
});


const routes = require('./server/routes/user');
app.use('/', routes);



app.listen(port, () => console.log(`Listening on port ${port}`));