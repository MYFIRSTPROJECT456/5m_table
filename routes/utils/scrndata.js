var utils = require('./utils.js');
var async = require('async');

exports.list = function(req, res){
  var txn=req.session.ecryt_key;
  var coid = req.session.coid;
  var scrno=req.query.id;
  var data=req.query.data;
  var user = req.session.user;

  function getAllKpis(callback){
    async.parallel([
     async.apply(utils.get_datastore,coid,parseInt(scrno),txn)
     ], function(err, done) {
      if(err) console.log(err);
      return getserv(done,callback);  
      /*return callback(err,done);*/
    });
  }

  function getserv(tbln,callback){
    var mainres=[];
    var params=[];
    var Qry=tbln[0][0].col7;

    if(scrno == "573"){
      if(data=="1"){
        Qry += " WHERE tbl_task.userid =?";
        params.push(req.session.user.enid);
      }else
      {
        Qry += " WHERE tbl_task.assignto =?";
        params.push(req.session.user.enid);
      }
    }else if(scrno == "566"){

      if(user.mgrid == 0){
        Qry += " WHERE tbl_leads.status <> -1";
      }
      else{
        Qry += " WHERE tbl_leads.status <> -1 and assignto = ? OR assignto in (select tbl_login.enid FROM tbl_login WHERE tbl_login.mgrid =?)";
        params.push(req.session.user.enid);
        params.push(req.session.user.enid);
      }

    }
   // console.log("Table query: ",Qry);
    db.query(Qry,params,function(err, results){
      if (err){ 
        console.log(err);
      }
      else{
       var fresult =JSON.parse(JSON.stringify(results));
             // Scope is larger than function  
          //   console.log("Qry result:::",JSON.stringify(results));
           }

           for(var i = 0; i < fresult.length; ++i) {
             var json = fresult[i];
             var result =[];
             for(var prop in json) {
              if( prop!=null && json[prop] !=null && json[prop] != '' && prop.toString().includes("date")){
               var formatted=utils.get_dateString(json[prop]);
               result.push(formatted); 
             }else{
                //console.log("key",json[prop]);
                result.push(json[prop]);
              }
            }
            mainres.push(result);
          }
          callback(err,mainres);
        });
  }

  getAllKpis(function(err,result){

    if(err){
      console.log(err);
    }

  //  console.log("Datatable result: ",result);
    res.send(JSON.parse(JSON.stringify({"data":result})));  
  });
}

