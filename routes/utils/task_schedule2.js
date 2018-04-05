var utils = require('./../utils.js');
var async = require('async');

var leadupdata,leaddata,leadid,user,prdid=[],crmdata,assigncrm;
var executed =false;
var Task_Process2={ 
  taskmaster: function(col1,col2,col3,col4,callback){
    leadupdata=col2;
    leadid=col3;
    user=col4;  


    function getAllKpis(callback) {
     return  getLeaddata(callback);
   }

   function getLeaddata(callback){

    var sql1="SELECT tbl_leads.leadid,tbl_leads.leadname,tbl_leads.assignto,tbl_leadupdate.product FROM `tbl_leads` JOIN tbl_leadupdate on tbl_leads.leadid=tbl_leadupdate.leadid WHERE tbl_leadupdate.leadstatus =37 AND tbl_leads.leadid = ?";

    var params = [];
    params.push(leadid);   

    db.query(sql1,params,function(err, results){  
      var resp = JSON.parse(JSON.stringify(results));
      // console.log("Lead data tasks",resp);
      leaddata=resp[0];
      crmdata=(""+leaddata['product']);
      prdid=(""+leaddata['product']).split(',');

      console.log("Product ids",prdid);  

      async.forEach(prdid,function(value, callback) {
       getTasks(value,callback);
     }, function(err, results) {
       return  callback(err,results);
     });

    });

  };

  function getTasks(value,callback){

    var sql1="SELECT sc.tdefid,sc.tdefname,sc.tdefrole,sc.task_tasktype, c.tdefname AS parentname, sc.parenttdefid FROM tbl_task_def sc LEFT JOIN tbl_task_def c ON c.tdefid = sc.parenttdefid WHERE sc.prodid = ? and sc.parenttdefid <> 0  ORDER by sc.task_seq; select GROUP_CONCAT(tdefname) as crmdata,tdefrole from tbl_task_def WHERE parenttdefid =0 and find_in_set(prodid,?) GROUP by 2";
    var params = [];
    params.push(value);   
    params.push(crmdata);   
    db.query(sql1,params,function(err, results){  

     var resp = JSON.parse(JSON.stringify(results));

     console.log("Product tasks",resp);
     return processtask(resp[0],resp[1],value,callback);  
   });

  };

  function processtask(tasks,crm,value,callback){

    var params = [];
    var param=[];
    var task;
    for (var i = 0; i < tasks.length; i++) {
      task=tasks[i];

        param.push(task.parentname + " for " + leadupdata.leadname); // change to parent task name
        param.push(task.tdefname);
        param.push(leadupdata.duedate1);

        param.push('');
        param.push(value);
        param.push(task.task_tasktype);

        param.push("3");
        param.push(task.tdefrole);
        param.push(leaddata.leadid);

        param.push(user.enid);
        param.push(parseFloat(0.0));
        param.push(parseFloat(0.0));
        params.push(param);
        param=[];
      }

//  for crm
if(!executed){
try{
      crmdata=crm[0].crmdata;
     assigncrm=crm[0].tdefrole; 
param.push(leaddata.leadname + "-" + crmdata + "- Order Verification");
param.push("Please confirm the scope of the work with Customer");
param.push(leadupdata.duedate1);

param.push('');
param.push(value);
param.push('');

param.push("3");
param.push(assigncrm);
param.push(leaddata.leadid);

param.push(user.enid);
param.push(parseFloat(0.0));
param.push(parseFloat(0.0));
params.push(param);
param=[];
executed=true;
}catch(err){};
}

//  console.log("Product params",params);
return savedata(params,callback)
}

function savedata(param,callback){

  var query="INSERT INTO `tbl_task` (`name`, `taskdesc`, `duedate`, `taskdate`, `products`, `tasktype`, `taskstatus`, `assignto`, `customer`,`userid`, `txn_latid`, `txn_longid`) VALUES ?";

  db.query(query,[param], function(err, results) {

   return  callback(err,results);
 });
}

getAllKpis(function(err,result){
  console.log("Final result",result);
  callback(err,result); 
});
}
}

module.exports = Task_Process2; 
