var express = require('express');  
var router = express.Router();  
var Dropdown = require('./dropdownmodel');  
router.get('/sample', function(req, res, next) {  
        Dropdown.getSample(function(err, rows) {  
        //	console.log("Dropdown result : **",rows);
            if (err) {  
                res.send(err);  
            } else {  
               res.send(rows); 
            }  
        });      
}); 




module.exports = router;  