var request = require('request');
exports.login = function(req, res){
	var message = '';
	message='method not post';
	console.log('method not post');
		res.render('dashboard.ejs',{message:  message}); 
}  
