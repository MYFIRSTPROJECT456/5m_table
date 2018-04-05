var utils = require('./utils.js');
var async = require('async');
var Master_Process = require('./master_staging.js');


exports.processdata = function(req, res) {

var user=req.session.user;
var txn=req.session.ecryt_key;


	console.log("Process CALLED");
    var status = parseInt(0);
    function getAllKpis(callback) {
        var getfiles = "SELECT * FROM `tbl_uploadlog` WHERE Status = ?";
        db.query(getfiles, [status], function(err, results) {
            if (err) {
                console.log(err);
            } else {
                var filelist = JSON.parse(JSON.stringify(results)); // Scope is larger than function  
            }
        /*    console.log("file list : "+JSON.stringify(results));*/

            async.forEach(filelist, function (item, callback){ 
                console.log("file object : ",JSON.stringify(item));
                getinsertquery(item['uploadid'],item['filename'],item['batchno'],callback);
            }, function(err) {
                console.log('iterating done');
           
              return callvalidateservice(callback);
            });
        });
    }

    function getinsertquery(uploadid,filename,batchno,callback){
    async.parallel([
        async.apply(utils.get_uploadcode,uploadid,txn) 
    ], function(err, result) {
        if(err) console.log(err);
        var menudata = JSON.parse(JSON.stringify(result));
        return insertfiledata(menudata[0][0]['insertsql'], filename,batchno,callback); 
  });
    }

    function insertfiledata(query,filename,batchno,callback){
    	 
    	    var lineReader = require('readline').createInterface({
                input: require('fs').createReadStream(filename)
            });
            
            var filedata = [];
            lineReader.on('line', function (line) {
                var data = line.split(",");
                data.push(parseInt(batchno));
                filedata.push(data);
            }).on('close', function() {
                console.log("insert data  filedata : ", filedata);
                
                db.query(query, [filedata], function(err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        var dump = JSON.parse(JSON.stringify(results)); // Scope is larger than function  
                    }
                    return updatestatus(parseInt(1),batchno,callback);
                    // return callback(err, dump);
                }); 
            });
    }

    function updatestatus(status,batchno,callback){
    	console.log("***INside update status***");
        var query = "UPDATE `tbl_uploadlog` SET Status=? WHERE batchno = ?"
        db.query(query, [status,batchno], function(err, results) {
            if (err) {
                console.log(err);
            } else {
                var update = JSON.parse(JSON.stringify(results)); // Scope is larger than function  
            }
            return callback(err, update);
        }); 
    }

    function callvalidateservice(callback){
	console.log("***INside callvalidateservices***");
    async.parallel([
          function getAllKpis(callback) {
        var getfiles = "SELECT * FROM `tbl_uploadlog` WHERE Status = 1";
        db.query(getfiles, function(err, results) {
            if (err) {
                console.log(err);
            } else {
                var filelist = JSON.parse(JSON.stringify(results)); // Scope is larger than function  
            }
              callback(err,filelist);
        });
    }
   ], function(err, done) {
        async.forEachLimit(done[0], 4,function(value, callback) {
               Master_Process.processmaster(user,value.uploadid,value.batchno,txn,callback);
        }, function(err, results) {
         return  callback(err,results);
        });
  });
}

    getAllKpis(function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log("Process files complete");
        res.send({status:"1"});
        /* res.render('parameter_setup',{fields:done[0],groups:done[1]}); */
    });

}