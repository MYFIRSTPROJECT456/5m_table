/*   
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7
Version: 2.1.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v2.1/admin/material/
*/

var handleDataTableScroller1 = function(scrnid) {

	"use strict";
    var id=scrnid;

    if ($('#data-table1').length !== 0) {
        $('#data-table1').DataTable({
            dom: 'lBfrtip',
            buttons: [
                { extend: 'copy', className: 'btn-sm' },
                { extend: 'csv', className: 'btn-sm' },
                { extend: 'excel', className: 'btn-sm' },
                { extend: 'pdf', className: 'btn-sm' },
                { extend: 'print', className: 'btn-sm' }
            ],
            
            ajax: {
            "url": "/scrndata?id="+id,
            "dataType": "JSON"
           },
            "language": {
        "emptyTable":     "No record found"
    },
      responsive: true,
            select: true
        });
    }
};
var handleDataTableScroller0 = function() {

    "use strict";
    if ($('#data-table1').length !== 0) {
        $('#data-table1').DataTable({
            dom: 'lBfrtip',
            buttons: [
                { extend: 'copy', className: 'btn-sm' },
                { extend: 'csv', className: 'btn-sm' },
                { extend: 'excel', className: 'btn-sm' },
                { extend: 'pdf', className: 'btn-sm' },
                { extend: 'print', className: 'btn-sm' }
            ],
            select: true,
            responsive: true
        });
    }
};

var handleDataTableScroller00 = function() {

    "use strict";
    if ($('#data-table1').length !== 0) {
        $('#data-table1').DataTable({
            dom: 'lBfrtip',
              buttons: [
               
            ],
            select: true,
            responsive: true
        });
    }
};

var handleDataTableScroller2 = function(scrnid) {

    "use strict";
    var id=scrnid;
 if ($('#data-table2').length !== 0) {
        $('#data-table2').DataTable({
            dom: 'lBfrtip',
            buttons: [
                { extend: 'copy', className: 'btn-sm' },
                { extend: 'csv', className: 'btn-sm' },
                { extend: 'excel', className: 'btn-sm' },
                { extend: 'pdf', className: 'btn-sm' },
                { extend: 'print', className: 'btn-sm' }
            ],
            
            ajax: {
            "url": "/scrndata?id="+id,
            "dataType": "JSON"
           },
            "language": {
        "emptyTable":     "No record found"
    },
      responsive: true,
            select: true
        });
    }
};
var handleDataTableScroller3 = function(scrnid) {

    "use strict";
    var id=scrnid;
 if ($('#data-table1').length !== 0) {
        $('#data-table1').DataTable({
            dom: 'lBfrtip',
            buttons: [
                { extend: 'copy', className: 'btn-sm' },
                { extend: 'csv', className: 'btn-sm' },
                { extend: 'excel', className: 'btn-sm' },
                { extend: 'pdf', className: 'btn-sm' },
                { extend: 'print', className: 'btn-sm' }
            ],
            
            ajax: {
            "url": "/scrndata?id="+id+"&data=0",
            "dataType": "JSON"
           },
            "language": {
        "emptyTable":     "No record found"
    },
    "fnCreatedRow": function( nRow, aData, iDataIndex ) {
        $(nRow).attr('id', '15');
    },searching: false,
      responsive: true,
            select: true,
            autoWidth: false
        });
    }

 if ($('#data-table2').length !== 0) {
        $('#data-table2').DataTable({
            dom: 'lBfrtip',
            buttons: [
                { extend: 'copy', className: 'btn-sm' },
                { extend: 'csv', className: 'btn-sm' },
                { extend: 'excel', className: 'btn-sm' },
                { extend: 'pdf', className: 'btn-sm' },
                { extend: 'print', className: 'btn-sm' }
            ],
            
            ajax: {
            "url": "/scrndata?id="+id+"&data=1",
            "dataType": "JSON"
           },
            "language": {
        "emptyTable":     "No record found"
    },
    "fnCreatedRow": function( nRow, aData, iDataIndex ) {
        $(nRow).attr('id', '15');
    },
    searching: false,
      responsive: true,
            select: true,
            autoWidth: false
        });
    }

};



var TableManageScroller1 = function () {
	"use strict";
    return {
        //main function
        init: function (scrnid) {
            handleDataTableScroller1(scrnid);
        }
    };
}();

var TableManageScroller2 = function () {
    "use strict";
    return {
        //main function
        init: function (scrnid) {
            handleDataTableScroller2(scrnid);
        }
    };
}();

var TableManageScroller0 = function () {
    "use strict";
    return {
        //main function
        init: function () {
            handleDataTableScroller0();
        }
    };
}();

var TableManageScroller00 = function () {
    "use strict";
    return {
        //main function
        init: function () {
            handleDataTableScroller00();
        }
    };
}();

var TableManageScroller3 = function () {
    "use strict";
    return {
        //main function
        init: function (scrnid) {
            handleDataTableScroller3(scrnid);
        }
    };
}();