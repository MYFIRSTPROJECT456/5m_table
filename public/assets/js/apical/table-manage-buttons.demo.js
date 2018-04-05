/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7
Version: 2.1.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v2.1/admin/html/
*/

var handleDataTableButtons = function(field2) {

var buttonsA=[];

//console.log("**********51**************88");
/*var access=<%= user.access %>;
var accessarray=access.toString().split(',');
if(accessarray[0] == '1')
buttonsA.push({ extend: 'copy', className: 'btn-sm' });
if(accessarray[1] == '1')
buttonsA.push({ extend: 'csv', className: 'btn-sm' });
if(accessarray[2] == '1')
buttonsA.push({ extend: 'excel', className: 'btn-sm' });
if(accessarray[3] == '1')
buttonsA.push({ extend: 'pdf', className: 'btn-sm' });
if(accessarray[4] == '1')
buttonsA.push({ extend: 'print', className: 'btn-sm' });*/

	"use strict";
    var id = "555";
    if ($('#data-table1').length !== 0) {
        $('#data-table1').DataTable({
            dom: 'Bfrtip',
            buttons: [
                { extend: 'copy', className: 'btn-sm' },
                { extend: 'csv', className: 'btn-sm' },
                { extend: 'excel', className: 'btn-sm' },
                { extend: 'pdf', className: 'btn-sm' },
                { extend: 'print', className: 'btn-sm' }
            ],
         /*   buttonsA,*/
            ajax: {
                "url": "/uploaddetails",
                "dataType": "JSON",
                "type" : "POST",
                "data": function ( d ) {
                    d.scrid = id;
                    /*    return JSON.stringify({"scrid" : id});*/
                }
            },
            responsive: true,
            autoWidth: false
        });
    }
};

var handleDataTableButtons2 = function(field) {
    "use strict";
    
    if ($('#data-table2').length !== 0) {
        $('#data-table2').DataTable({
            dom: 'Bfrtip',
            buttons: [
                { extend: 'copy', className: 'btn-sm' },
                { extend: 'csv', className: 'btn-sm' },
                { extend: 'excel', className: 'btn-sm' },
                { extend: 'pdf', className: 'btn-sm' },
                { extend: 'print', className: 'btn-sm' }
            ],
            responsive: true
        });
    }
};

var handleDataTableButtons1 = function(field) {
    "use strict";
    
    if ($('#data-table3').length !== 0) {
        $('#data-table3').DataTable({
            dom: 'Bfrtip',
            buttons: [
                { extend: 'copy', className: 'btn-sm' },
                { extend: 'csv', className: 'btn-sm' },
                { extend: 'excel', className: 'btn-sm' },
                { extend: 'pdf', className: 'btn-sm' },
                { extend: 'print', className: 'btn-sm' }
            ],
            responsive: true
        });
    }
};


var TableManageButtons = function () {
	"use strict";
    return {
        //main function
        init: function (field1) {
            handleDataTableButtons(field1);
            handleDataTableButtons1(field1);
            handleDataTableButtons2(field1);
        }
    };
}();