var utils = require('./utils.js');
var async = require('async');

exports.list = function(req, res){
var txn=req.session.ecryt_key;
var coid = req.session.coid;
var txnid=req.body.id;
/*var txnid = 12348;*/

console.log("txnid : ",req.body);

function getAllKpis(callback){
    async.parallel([
      async.apply(utils.get_taskdata,parseInt(txnid),parseInt(txnid),txn)
    ], function(err, done) {
        if(err) console.log(err);
        return callback(err,done);
  });
}


  getAllKpis(function(err,result){
    if(err){
      console.log(err);
    }
    console.log(result);
    console.log(JSON.stringify({"resp":result[0][0]}));
    res.send(result[0][0]);  
  });
}


exports.leadlist = function(req, res) {
    var txn = req.session.ecryt_key;
    var coid = req.session.coid;
    var lid = req.body.lid;
    var scrno = 566;

    function getserv(callback) {
/*        async.parallel([
            async.apply(utils.getleaddetails,lid,parseInt(scrno),txn)
        ], function(err, done) {
            if(err) console.log(err);
            return callback(err,done);
        });*/

           var query = "SELECT a.leadid,a.leadname,a.email,a.mobileno,a.source,a.address,a.company,a.leadtype,a.assignto,a.nmd,a.refname,a.refnumber,a.products,b.product,b.leadstatus,b.contractid,b.contractvalue,b.amtr,b.amtp FROM tbl_leads a ,(select leadid, (select GROUP_CONCAT(cvvalule) from tbl_codevalue WHERE find_in_set(cvid, (product))) as product,leadstatus,contractid,contractvalue,amtr,amtp from tbl_leadupdate WHERE leadstatus =37) b WHERE a.leadid =? and a.status <> -1 AND a.leadid=b.leadid";

        db.query(query, [lid], function(err, results) {
          if (err) {
            console.log(err);
          } else {
                var leadsearch = JSON.parse(JSON.stringify(results)); // Scope is larger than function 
              }
              callback(err, leadsearch);
            });
    }
    
    getserv(function(err, result) {

        if (err) {
            console.log(err);
        }
        // console.log("Update schedule result: ", result);
        if(result != null && result.length >0)
        res.send(result[0]);
      else
         res.send([]);
        /* res.render('parameter_setup',{fields:done[0],groups:done[1]}); */
        // res.send({scrndtl:result[0]});  

    });
}