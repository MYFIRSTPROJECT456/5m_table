var utils = require('./utils.js');
var async = require('async');

exports.list = function(req, res){
	var txn=req.session.ecryt_key;
	var coid = req.session.coid;
	var user = req.session.user;

	function getAllKpis(callback){
		async.parallel([
			get_reports
			], function(err, done) {
				if(err) console.log(err);
				return callback(err,done);
			});
	}

	function get_reports(callback){
		var getreportsQry = "SELECT  `leadid`, (select tbl_leads.leadname from tbl_leads where tbl_leads.leadid=tbl_leadupdate.leadid) as `Name`, `remarks`, ( select tbl_codevalue.cvvalule from tbl_codevalue where tbl_codevalue.cvid=tbl_leadupdate.stage)  as `stage`, ( select tbl_codevalue.cvvalule from tbl_codevalue where tbl_codevalue.cvid=tbl_leadupdate.leadstatus) as `leadstatus`, `contractid`,  (select tbl_login.enname from tbl_login where tbl_login.enid=tbl_leadupdate.userid) as `User`,  date(date_gen) as `txndate`  FROM `tbl_leadupdate` where tbl_leadupdate.userid in(select  enid as id from tbl_login WHERE tbl_login.enid=? UNION select  enid as id from (select enid,mgrid from tbl_login WHERE mgrid is not null order by mgrid, enid) u,(select @pv := ?) i where find_in_set(mgrid, @pv) > 0 and @pv := concat(@pv, ',', enid))";

		db.query(getreportsQry, [user.enid,user.enid] ,function(err, results){
			if (err){ 
				console.log(err);
			}
			else{
           var customers =JSON.parse(JSON.stringify(results));  // Scope is larger than function  
       }
       return callback(err,customers);
   });
	};

	getAllKpis(function(err,result){

		if(err){
			console.log(err);
		}
		res.render('dsr.ejs',{reports:result[0]});   
	});
}
