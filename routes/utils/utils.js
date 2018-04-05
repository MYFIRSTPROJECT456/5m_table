var request = require('request');
module.exports = {
  getscrndtl: function gettxn(col1,col2,txn,txncallback){
    var Qry   = "SELECT col3,cast(aes_decrypt(col4, ?) as char) as col4,cast(aes_decrypt(col5, ?) as char) as col5,cast(aes_decrypt(col6, ?) as char) as col6,col7,col8,cast(aes_decrypt(col9, ?) as char) as col9,cast(aes_decrypt(col10, ?) as char) as col10,col11,col12,cast(aes_decrypt(col13, ?) as char) as col13,cast(aes_decrypt(col14, ?) as char) as col14,col15,col16,col17,col18,cast(aes_decrypt(col19, ?) as char) as col19,cast(aes_decrypt(col20, ?) as char) as col20,col25 FROM `syscontrol2` where col1= ? and col2= ? and col8 <> 8 and col22 <>1 order by col11,col12";

    db.query(Qry,[txn,txn,txn,txn,txn,txn,txn,txn,txn,col1,col2], function(err, results){
      if (err){ 
        console.log(err);
      }
      else{
          var fresult =JSON.parse(JSON.stringify(results));  // Scope is larger than function  
        }
        return txncallback(err,fresult);
      });
  },
  get_groups: function get_groups(col1,col2,txn,callback){

    var getmenuqry = "SELECT col12,cast(aes_decrypt(col13, ?) as char) as col13,cast(aes_decrypt(col14, ?) as char) as col14 FROM `syscontrol2`  WHERE col2 =? and col8 <> 8 GROUP BY 1,2,3 order by col12";

    db.query(getmenuqry,[txn,txn,col2], function(err, results){
     if (err){
      console.log(err);
    }
    else{
           var menudata =JSON.parse(JSON.stringify(results));  // Scope is larger than function  
         }
         return callback(err,menudata);
       });
  },
  get_datastore: function get_datastore(col1,col2,txn,callback){
    var getDatastoreQry = "SELECT col2 ,cast(aes_decrypt(col3, ?) as char) as col3,cast(aes_decrypt(col4, ?) as char) as col4,cast(aes_decrypt(col5, ?) as char) as col5,cast(aes_decrypt(col6, ?) as char) as col6,cast(aes_decrypt(col7, ?) as char) as col7,cast(aes_decrypt(col9, ?) as char) as col9 FROM syscontrol3 WHERE col1 =? AND col2 =?";

    db.query(getDatastoreQry,[txn,txn,txn,txn,txn,txn,col1,col2], function(err, results){
     if (err){
      console.log(err);
    }
    else{
             var data =JSON.parse(JSON.stringify(results));  // Scope is larger than function  
           }

           return callback(err,data);
         });
  },
  getKpis:function getKpis(user,callback){

    var query = "select (select count(*) from tbl_leads WHERE tbl_leads.assignto=? OR tbl_leads.assignto in (select tbl_login.enid FROM tbl_login WHERE tbl_login.mgrid =?)) as tleads,(SELECT count(*) from tbl_task WHERE  status <> -1) as toverview,(SELECT count(*) from tbl_task WHERE taskstatus <>6 and status <> -1 and tbl_task.assignto=?) as ptasks, 0 as lfunnel";

    db.query(query, [user.enid,user.enid,user.enid] ,function(err, results) {
      if (err) {
        console.log(err);
      } else {
        var kpis = JSON.parse(JSON.stringify(results));
               // console.log("Columns of table",leadsearch); // Scope is larger than function 
             }
             callback(err, kpis);
           });
  },
  get_dateString:function(raw_date){
    var dateformatted="";
    var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    var date=new Date(raw_date).toISOString().slice(0,10).replace('T',' ').toString();
    var d1 = date.split("-");
    var temp_date = new Date(d1[0], parseInt(d1[1])-1, d1[2]);
    var day = temp_date.getDate();
    var month = months[temp_date.getMonth()];
    var year = temp_date.getFullYear();
    if(day >0 && day < 10)
      day ="0"+day;
    dateformatted=""+day+"-"+month+"-"+year;
    return dateformatted;
  },

  insert_data: function insert_data(col1, col2, col3, callback) {
   /*     console.log('txnid : ', col1);*/
   var query = col1;

   var params = [];
   var parsed = JSON.parse(JSON.stringify(col2));
   for(var x in parsed){
     /*     console.log("key : ",x , parsed[0][x] );*/
     if (x == 'data-table1_length') {
//                parsed[0].splice(x, 1);
}else{
  params.push(parsed[x]);
}
}
        //params.shift();
        params.push(col3);
        params.push(parseFloat(0.0));
        params.push(parseFloat(0.0));

        db.query(query, params, function(err, results) {
          if (err) {
            console.log(err);
          } else {
            console.log('response : ', JSON.stringify(results));
                var insertresp = JSON.parse(JSON.stringify(results)); // Scope is larger than function 
                /*          console.log(JSON.stringify(insertresp));*/
              }
              return callback(err, insertresp);
            });
      }
    };