var async = require('async');
var utils = require('./utils.js');
var Save = require('./savedata_var.js');
var Validation = require('./lib/validate.js');

exports.add = function(req, res){
    var txn=req.session.ecryt_key;
    var coid=req.session.coid;
    var userid = req.session.user.enid;
    var user = req.session.user;
    var tuser=JSON.parse(req.body.formdata);
    var scrid=""+req.body.scrid;
// var query ="INSERT INTO `tbl_params` (`Leadstatus`, `Name`, `Description`, `Parent`,`userid`) VALUES (?, ?, ?, ?, ?)";

var query = "";
var params = [];
console.log("Scrid",scrid);
console.log("Screen details which were added",tuser);
function getAllKpis(callback){
return Save.savemaster(user,txn,scrid,tuser[0],callback);
}
    
getAllKpis(function(err,results){
         //    console.log("FInal saving result",JSON.stringify(results));
  if(err){ 
         res.send({status:'0',err_msg:err.message});
  }
  else{
         res.send({status:'1'});
  }
  });

}