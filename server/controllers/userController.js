const { response } = require('express');
const mysql = require('mysql');
const { connect } = require('mysql');

//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS

});


//view users
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as id ' + connection.threadId);
        //user connection
        connection.query('SELECT * FROM user', (err, rows) => {
            //when done with the connection release it
            connection.release();
            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}
//find user by search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as id ' + connection.threadId);


        let searchTerm = req.body.search;

        //user connection
        connection.query('SELECT * FROM user WHERE full_name LIKE? OR email LIKE? OR phone LIKE? OR location LIKE?', ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            //when done with the connection release it
            connection.release();
            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}

exports.form = (req, res) => {
    res.render('add-user');
}

//Add new user
exports.create = (req, res) => {
    //res.render('add-user');
    const { full_name, age, gender, location, email, phone } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as id ' + connection.threadId);


        let searchTerm = req.body.search;

        //user connection
        connection.query('INSERT INTO user SET full_name = ?, age = ?, gender = ?, location = ?, email = ?, phone = ?', [full_name, age, gender, location, email, phone], (err, rows) => {
            //when done with the connection release it
            connection.release();
            if (!err) {
                res.render('add-user', { alert: 'New user added successfully!' });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}

//edit user
exports.edit = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as id ' + connection.threadId);
        //user connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with the connection release it
            connection.release();
            if (!err) {
                res.render('edit-user', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}

//update user
exports.update = (req, res) => {
    const { full_name, age, gender, location, email, phone } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as id ' + connection.threadId);
        //user connection
        connection.query('UPDATE user SET full_name = ?, age = ?, gender = ?, location = ?, email = ?, phone = ? WHERE id = ?', [full_name, age, gender, location, email, phone, req.params.id], (err, rows) => {
            //when done with the connection release it
            connection.release();
            if (!err) {

                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as id ' + connection.threadId);
                    //user connection
                    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
                        //when done with the connection release it
                        connection.release();
                        if (!err) {
                            res.render('edit-user', { rows, alert: `${full_name}'s profile has been updated.` });
                        } else {
                            console.log(err);
                        }
                        console.log('The data from user table: \n', rows);
                    });
                });



            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}

//delete user
exports.delete = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as id ' + connection.threadId);
        //user connection
        connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with the connection release it
            connection.release();
            if (!err) {
                res.redirect('/');
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}


exports.viewall = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as id ' + connection.threadId);
        //user connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with the connection release it
            connection.release();
            if (!err) {
                res.render('view-user', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}