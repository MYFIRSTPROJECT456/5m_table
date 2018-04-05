var request = require('request');
var jsonfile = require('jsonfile');
var fs = require('fs');
var obj;

var filenames= {
    '1': "account.json",
    '2': "accountopbal.json",
    '3': "acgrp.json",
    '4': "bank.json",
    '5': "bnktxn.json",
    '6': "branch.json",
    '7': "cashtxn.json",
    '8': "customer.json",
    '9': "finyear.json",
    '10': "jv.json",
    '11': "sosetup.json",
    };

exports.build = function(req, res){
  
var file = __dirname + '/../json/';
 if(req.method == "POST"){

	  var post  = req.body;
      var lval=""+post.lval;
      console.log("Menu click :",lval);
	
		file +=  filenames[lval];
		
	fs.readFile(file, 'utf-8', function(err, data) {
		if (err) throw err;

		var arrayOfObjects = JSON.parse(JSON.stringify(JSON.parse(data)));
		var fields=arrayOfObjects.screens.fields[0];
    var scrname=arrayOfObjects.screens.scrnname;
    var scrid=arrayOfObjects.screens.scrnid;
for (var key in fields) {
	var value =fields[key];
	if(value.constructor === Array){}else{
      if (value.inputtype == -1 || value.visibility == 0) {
        delete fields[key];
      }
 }
    };
		res.render('dy_simpleform.ejs',{fields: fields}); 
	});
}
else{
	res.render('dashboard.ejs');
}

}  
