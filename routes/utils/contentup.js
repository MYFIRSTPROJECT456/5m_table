var utils = require('./utils.js');
var async = require('async');
var scrno;

exports.list = function(req, res){

	var txn=req.session.ecryt_key;
	var coid = req.session.coid;
	var user=req.session.user;
	function getAllKpis(callback){
    	async.parallel([
    		get_sanctions
   		], function(err, done) {
        	if(err) console.log(err);
			return callback(err,done);
  		});
	}

	function get_sanctions(callback){

	var Qry="SELECT * FROM `tbl_doc`";
      db.query(Qry,function(err, results){
            if (err){ 
              console.log(err);
            }
		else{
           var orders =JSON.parse(JSON.stringify(results));  // Scope is larger than function  
		}
//console.log("Docs",orders);
		callback(err,orders);
    });
};

	getAllKpis(function(err,result){
		if(err){
			console.log(err);
			}    
    	res.render('contentup.ejs',{docs:result[0]});     
	});
};