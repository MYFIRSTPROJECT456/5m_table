	var async = require('async');
	var utils = require('./../utils.js');

	var Validation={ 
	validate_value:function getserv(txnid,data,col3,callback){
		var mainid=txnid;
		var i=0;
		var err_msg="";
	//	console.log("Inside validate",col3);
		for(var k in data) {
  if (k != "data-table1_length" && k != "leadid") {
			var text=data[k];
			var validationsbits=col3[i].col9.split('');
   i++;
 //  	console.log("Iterating: ",k);
		validationsbits.forEach(function(arrayElement, index, array) {

			if(arrayElement != null && arrayElement != '0' ){
			   switch(index){
	   				            case 0://mandatory
	                                if (text == null || text == ""){
	                                    err_msg += k+" : is mandatory\n";
	                            }
	                                break;
	                            case 1://Number only
	                                if (text != null && text != "" && !text.match("^[0-9]+$"))
	                                     err_msg += k+" : only number allowed\n";
	                                break;
	                            case 2://Charector only
	                             var filter = /[a-zA-Z]/;
	                               if (text != null && text != "" && !filter.test(text))
	                               	 err_msg += k+" : only characters allowed\n";
	                                break;
	                            case 3://alpha numeric
	                                if (text != null && text != "" && !text.match("/[^0-9a-z]/i"))
	                                        err_msg += k+" : only aplhanumberic allowed\n";
	                                break;
	                            case 4://mobile no with +91
	                                break;
	                            case 5://email id
	                          /*  var filter = '/\S+@\S+\.\S+/';*//*
	                             var filter = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$";*/
	                             if (text != null && text != "" && !text.match("^(.+)@(.+)$"))
	                             	 err_msg += k+" : not valid email\n";
	                                break; 
	                            case 6://past date
	                             if (text != null || text != ""){
									if (Date.parse(text) < Date.now())
										err_msg += k+" : cannot be past date\n";
								}
	                            break;
	                            case 7://future date
	                             if (text != null || text != ""){
	                            		if (Date.parse(text) > Date.now())
										err_msg += k+" : cannot be future date\n";
								}
	                            break;           
	   }
	}
	});

		if(col3.col8 == '1'){
				if(text != null && text.length < parseInt(col3.col17) )
							err_msg += k+" : less than min length "+col3.col17+"\n";
				else if(text != null && text.length > parseInt(col3.col18))							
							err_msg += k+" : exceeding max length "+col3.col18+"\n";
		}

}
	}
	console.log("Done validating");
	if(err_msg == ""){
		var data={"txnid":mainid,"err_msg":"NA","status":"1"};
		var response=JSON.parse(JSON.stringify(data));
		callback(null,response);	
	}
	else
	{
		var err=new Error("Failure");
		var data={"txnid":mainid,"err_msg":err_msg,"status":"-1"};
		console.log(mainid+" : "+err_msg);
		var response=JSON.parse(JSON.stringify(data));
		callback(err,response);		
	}
	}
	}
	module.exports = Validation;  