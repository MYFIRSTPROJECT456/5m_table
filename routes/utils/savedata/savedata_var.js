var async = require('async');
var utils = require('./utils.js');
var Validation = require('./lib/validate.js');
var TaskSchedules = require('./task_schedule.js');


var Save_Process={ 
  savemaster: function(col1,col2,col3,col4,callback){
    var txn=col2;
    var coid = col1.coid;
    var userid=col1.enid;
    var user=col1;
    var tuser=col4;
    var scrid=col3;
    var query = "";
    console.log("Scrid",scrid);
    console.log("Screen details which were added",tuser);
    function getAllKpis(callback){
      async.parallel([
        async.apply(utils.get_datastore,coid,parseInt(scrid),txn),
        async.apply(utils.getscrndtl,coid,parseInt(scrid),txn)  
        ], function(err, result) {
          if(err) console.log(err);
          update(tuser,result[1],function(err,results){
            if(err){
              var error=new Error("Could not save :- \n"+results.err_msg);
              callback(error,result);
            }
            else{
             preprocess(result[0][0],function(err,result){
              if(err){
                var error=new Error("Failed while saving data");
                return   callback(error,result);
              }
              else {
                return  callback(err,result); 
              }
            });
           }
         });
        });
    }

    function update(data,scrndtl,callback){
      var txnid=parseInt(scrid);
      console.log("ID:"+scrndtl);
      return Validation.validate_value(txnid,data,scrndtl,callback);
    };

    function preprocess(data,callback){
      var params=[];
      var proceed=false;
      switch(scrid) 
      {
case "566"://lead
params=builddata(tuser);
         /* var count= checkLeadExist(proceed,callback);
          console.log("processed",count);
          if(count>0){proceed =false;}else{proceed =true;}
          */break;
case "569"://user
params=builddata(tuser);
break;
case "570"://CP
params=builddata(tuser);
break;
case "571"://CM
params=builddata(tuser);
break;
case "573"://task
if(tuser.tinterval != null && tuser.tinterval != '' &&  tuser.startdate != '' && tuser.enddate != ''){
  var taskschedules=TaskSchedules.taskmaster(tuser);
  params=builddata(taskschedules);
}
else{
  params=builddata(tuser);
}


break;
default://dfault json object
params=builddata(tuser);
break;          
}

return savedata(data,params,callback);
};

function builddata(data){
  var params = [];
  var param=[];
  if(data.constructor === Array){
    console.log("*********INSIDEARRAY********",data);
    for (var i = 0; i < data.length; i++) {
      var item =data[i];
      for(var x in item){
        if (x == 'data-table1_length') {
        }else{
          param.push(item[x]);
        }
      }
      param.push(parseInt(userid));
      param.push(parseFloat(0.0));
      param.push(parseFloat(0.0));
      params.push(param);
      param=[];
    }
  }
  else{  
    console.log("*********NOTARRAY********");
    if(scrid=="566"){
      param.push(""+(new Date().getFullYear())+""+(Math.floor(Math.random() * 10000000)));
    }
    for(var x in data){
      if (x == 'data-table1_length') {
      }else{
        param.push(data[x]);
      }
    }

    param.push(parseInt(userid));
    param.push(parseFloat(0.0));
    param.push(parseFloat(0.0));
    params.push(param);
  }
  return params;   
}


function savedata(data,param,callback){
  query = data.col6;
  console.log("SAVE DATA",query,param);

  db.query(query, [param], function(err, results) {
    var insertresp = JSON.parse(JSON.stringify(results));
    if (err) {
              // console.log(err);
            } 
            /*                console.log('response : ', JSON.stringify(results));*/
                return postprocessing(err,insertresp,data,param,callback); // Scope is larger than function 
                /*          console.log(JSON.stringify(insertresp));*/
                
              });
}

function postprocessing(err,insertresp,data,param,callback){

//console.log("scrid pp"+scrid);

switch(scrid) 
{
case "566"://lead
createReference(param,data);
return createSchedule(param,callback);
break;
case "569"://user
console.log("Inside login");
return insertlogin(param,callback);
break;
case "570"://CP
return callback(err,insertresp);
break;
case "571"://CM
return callback(err,insertresp);
break;
case "573"://task
console.log("checks",tuser.taskstatus,user.roleid);
if(tuser.taskstatus=="6" && user.roleid == "60" ){
  return saveMgr(callback);
}else{
  return callback(err,insertresp);
}
break;
}
};


function createReference(param,data){
  var tempparam=[];
  try{
var tdate = new Date();
tdate.setDate(tdate.getDate() + 2); 
var dd = tdate.getDate();
var mm = tdate.getMonth() + 1;
var y = tdate.getFullYear();
var refnmd = mm + '/'+ dd + '/'+ y;


    var query = "INSERT INTO `tbl_leads` (`leadname`, `mobileno`, `assignto`, `nmd`, `userid`, `txn_latid`, `txn_longid) VALUES (?,?,?,?,?,?,?)";

    tempparam.push(param[0][0].refname);
    tempparam.push(param[0][0].refnumber);
    tempparam.push(param[0][0].assignto);
    tempparam.push(refnmd);
    tempparam.push(parseInt(userid));
    tempparam.push(parseFloat(0.0));
    tempparam.push(parseFloat(0.0));

    db.query(query, [param], function(err, results) {

    });
  }catch(err){}
}






function saveMgr(callback){

  var sql1="INSERT INTO `tbl_task` (`name`,`taskdesc`,`duedate`,`taskstatus`,`assignto`,`userid`, `txn_latid`, `txn_longid`) VALUES (?,?,?,?,(select enid from tbl_login WHERE roleid=61),?,?,?)";
  var params = [];
  params.push(tuser.name +"-Execution");
  params.push("Please execute the project as per the contract");
        params.push(tuser.duedate);//add due date
        params.push("3");
        params.push(userid);
        params.push(parseFloat(0.0));
        params.push(parseFloat(0.0));
        db.query(sql1,params,function(err, results){
          console.log("Error manager",err);
          return callback(err,results);   
        });
      }

      function updatetask(callback){
        var sql1="INSERT INTO `tbl_task` (`name`,`taskdesc`,`duedate`,`taskstatus`,`assignto`,`userid`, `txn_latid`, `txn_longid`) VALUES (?,?,?,?,(select enid from tbl_login WHERE roleid=61),?,?,?)";
        var params = [];
        params.push(tuser.name +"-Execution");
        params.push("Please execute the project as per the contract");
        params.push(tuser.duedate);//add due date
        params.push("3");
        params.push(userid);
        params.push(parseFloat(0.0));
        params.push(parseFloat(0.0));
        db.query(sql1,params,function(err, results){
         if(err) console.log("Updatetask",err);
         return callback(err,results);   
       });
      }

      function createSchedule(param,callback){
        var lparam=param[0];
        var sql1="INSERT INTO `tbl_schedules` (`reftxnid`, `reftxn`, `sch_date`, `sch_status`, `sch_remarks`, `sch_user`, `assigned_by`) VALUES (?,?,?,?,?,?,?)";
        var params = [];
        params.push(lparam[0]);
        params.push(scrid);
        params.push(tuser.nmd);
        params.push(0);
        params.push("");
        params.push(tuser.assignto);
        params.push(userid);
        db.query(sql1,params,function(err, results){
          if(err) console.log("Error creatSchedule",err);
          return callback(err,results);   
        });
      }

      function checkLeadExist(proceed){
        var sql1="SELECT count(*) as count FROM `tbl_leads` WHERE email=? and mobileno =?";
        var params = [];
        params.push(tuser.email);
        params.push(tuser.mobileno);
        db.query(sql1,params,function(err, results){  
         var resp = JSON.parse(JSON.stringify(results));
         console.log("check lead ex",results,params);
         if(parseInt(resp[0].count) > 0){
           var error=new Error("Record already exists");
           proceed=false;
           return  1;
         }
         else{
          proceed=true;
          return 0;
        }   
      });
      };

      function insertlogin(param,callback){
        var query ="INSERT INTO `tbl_login` (`coid`,`enname`, `loginid`, `pwd`, `roleid`,`mgrid`) VALUES (?,?,?,?,?,?)";
        var params=[];
        params.push(coid);
        params.push(tuser.user_name);
        params.push(tuser.mobile);
        params.push("pass@123");
        params.push(tuser.role);
        params.push(tuser.reporting_to);
        db.query(query, params, function(err, results) {
         if(err) console.log("Login error",err);
         var insertresp = JSON.parse(JSON.stringify(results));
                return callback(err, insertresp); // Scope is larger than function 
              });
      }

      getAllKpis(function(err,result){
       callback(err,result); 
     });
    }
  }
  module.exports = Save_Process; 