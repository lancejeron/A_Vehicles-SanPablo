var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
   
    if (typeof process.env.ENABLE_DATABASE !== 'undefined' && process.env.ENABLE_DATABASE === 'false') {
        
        return render([]);
    }

       var db = require('../../lib/database')();

    db.query('SELECT * FROM users', function (err, results, fields) {
       
        if (err) return res.send(err);

            render(results);
    });

    function render(users) {
        res.render('update/views/index', { users: users });
    }
});

router.get('/update', (req, res) => {
    res.render('update/views/index');
});

router.post('/update', (req, res) => {
    // console.log('dito na ako');
    var db = require('../../lib/database')();
    db.query(`UPDATE users SET year = '${req.body.year}',make = '${req.body.make}',model = '${req.body.model}',plate_number= '${req.body.plate_number}',vcondition = '${req.body.vcondition}' WHERE id='${req.body.id}'`, function(err, results, fields) {
        if (err) console.log(err);
        res.redirect('/index');
    });
});

exports.update = router;