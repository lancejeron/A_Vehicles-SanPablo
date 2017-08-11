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

    function render() {
        res.render('home/views/index');
     }

});
    exports.index = router;