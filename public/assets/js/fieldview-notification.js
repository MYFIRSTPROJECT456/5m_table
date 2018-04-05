/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7
Version: 2.1.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v2.1/admin/html/
*/

var handleGritterNotification = function() {
	/*$('#add-regular').click( function() {
		$.gritter.add({
			title: 'This is a regular notice!',
			text: 'This will fade out after a certain amount of time. Sed tempus lacus ut lectus rutrum placerat. ',
			image: 'assets/img/user-3.jpg',
			sticky: false,
			time: ''
		});
		return false;
	});
	*/
	$('#create-company').click(function(){
		$.gritter.add({
			title: 'Company creation',
			text: 'New company created successfully'
		});
		return false;
	});

	$('#create-user').click(function(){
		$.gritter.add({
			title: 'User Registration',
			text: 'New user created successfully'
		});
		return false;
	});
	$("#remove-all").click(function(){
		$.gritter.removeAll();
		return false;
	});
};


var Notification = function () {
	"use strict";
    return {
        //main function
        init: function () {
            handleGritterNotification();
        }
    };
}();