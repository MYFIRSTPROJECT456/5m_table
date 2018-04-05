exports.changepass = function(req, res){
    // res.render('profile.ejs');

    if (req.method == "POST") {
        var post = req.body.formdata;
        var obj = JSON.parse(post);
        var oldpass = obj[0].oldpass;
        var newpass = obj[0].newpass;
        var confirmpass = obj[0].confirmpass;
        var userid = req.session.user.enid;
		console.log("Change password : ",JSON.stringify(post), oldpass , newpass, confirmpass,userid);
        var sql1 = "SELECT 	pwd FROM `tbl_login` WHERE enid=?";
 		db.query(sql1, [userid], function(err, results) {
 			if (err) {
 				 res.send({"status":-1,"message":"failed","error":err.sqlMessage});			
 			}else{
 				console.log("password : ",results, results[0].pwd);
 				if (oldpass == results[0].pwd) {
 					if(newpass == confirmpass){
 						updatePass(newpass,function(err,result){
 							if (err) {
 				 				res.send({"status":-1,"message":"failed","error":err.sqlMessage});			
 							}else{
 								res.send({"status":1,"message":"Password changed successfully"});
 							}
 						});
 					}else{
 						// confirm password doesnot match
 						res.send({"status":-1,"message":"failed","error":"Confirm password not matched"});
 					}
 				}else{
 					// please enter correct old password
 					res.send({"status":-1,"message":"failed","error":"Please enter correct password"});
 				}
 			}
 		});

	}

	function updatePass(newpass,callback){
		var sql1 = "UPDATE `tbl_login` SET `pwd`=? WHERE enid=?";
 		db.query(sql1, [newpass,userid], function(err, results) {
 			console.log("updatePass : ",err,results);
 			if (err) {
 				return callback(err,results);
 			}else{
 				return callback(err,results);
 			}
 		});
	}
        
};