/*exports.login = function(req, res){
req.session.coid="5";
req.session.ecryt_key="904697ab-8e60-11e7-bce2-000d3a1134dd";
res.render('dashboard.ejs');       
};*/
var request = require('request');
var Task_Process = require('./task_schedule.js');

exports.login = function(req, res){
   var message = '';
   var sess = req.session; 
 
   if(req.method == "POST"){
      var post  = req.body;
      var tenantid=post.PRM01;
      var name= post.PRM02;
      var pass= post.PRM03;

	var sql1="SELECT coid, enid, enname, loginid, roleid,mgrid, if(photo_url is null or photo_url=''  , CONCAT('"+url+"','contents/u00.png'),CONCAT('"+url+"',photo_url)) photo,(SELECT CONCAT_WS(',', copy_flg,exl_flg,pdf_flg,prt_flg,edt_flg) as list FROM tbl_accesscontrol WHERE tbl_accesscontrol.roleid=tbl_login.roleid) as access FROM `tbl_login` WHERE upper(loginid) = upper(?) and pwd = ?";
  
    db.query(sql1,[name,pass] ,function(err, results){      
         if(results != null && results.length>0){
  			req.session.user = results[0];
        res.locals.user = results[0];
        get_info(function(err,result){
        if(err){
            console.log(err);
        }else{
      		global.menudata=result; 
 /*     		console.log(global.menudata);*/

var options = {
    url: 'http://apicaldevserver.eastus.cloudapp.azure.com:3002/sampleauth',
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    form: {'PRM01': req.session.user.coid}
}

request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
      
        var guidsec=JSON.parse(body);
/*        console.log("key found***:",guidsec);*/
        req.session.ecryt_key=guidsec.guid;
        req.session.coid=req.session.user.coid;
/*        res.status(200).send('Secret');*/
        console.log("Key saved",req.session.ecryt_key);
     //  Task_Process.taskmaster();
        res.redirect('/dashboard');
    }
})
     /* 		req.session.coid="5";
			    req.session.ecryt_key="904697ab-8e60-11e7-bce2-000d3a1134dd";*/

      
     	  }
      });
   }else{
            message = 'Wrong Credentials.';
            console.log('Wrong Credentials.');
            res.render('index.ejs',{message: message});
         }                 
      });
   } else {
        message='method not post';
        console.log('method not post');
        res.render('index.ejs',{message: message});
   }  



function get_info(callback){
var getmenuqry      = "select tbl_menu.menuid, menuname, object, pmenuid,fld_faicon from tbl_menu, tbl_accesscontrol where coid =? and roleid =? and tbl_menu.status=0 and find_in_set(tbl_menu.menuid,tbl_accesscontrol.menuid)>0 order by seq";
   var session =req.session.user;
   db.query(getmenuqry, [session.coid,session.roleid],function(err, results){
  if (err){
    console.log(err);
  }
  else{
    var menudata =JSON.parse(JSON.stringify(results));  // Scope is larger than function  
  }
  return callback(err,menudata);

  });
};
};

exports.logout = function(req, res){
    req.session.destroy();
res.redirect('/');       
};