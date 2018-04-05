/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7
Version: 2.1.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v2.1/admin/html/
*/

var handleDataTableButtons10 = function() {
	"use strict";
    var id = "555";
    if ($('#data-table10').length !== 0) {
       //table 
    var table1 = $('#data-table10').DataTable({
        orderCellsTop: true,
         dom: 'lBfrtip',
            buttons: [
            ],
           autoWidth: false,
            ajax: {
                "url": "/acceptdetails",
                "dataType": "JSON",
                "type" : "POST",
                "data": function ( d ) {
                    d.scrid = "566";
                    /*    return JSON.stringify({"scrid" : id});*/
                }
            },
             initComplete: function () {
                this.api().columns([0,2]).every( function () {
                    var column = this;
                    var select = $('<select style=\'width:100%\';></select>')
                            .appendTo( '#data-table10 thead tr:eq(1) th:eq('+column.index()+')')
                            .on( 'change', function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                        $(this).val()
                                );
 
                                column
                                        .search( val ? '^'+val+'$' : '', true, false )
                                        .draw();
                            } );
 
                    column.data().unique().sort().each( function ( d, j ) {
                        select.append( '<option value="'+d+'">'+d+'</option>' )
                    } );
                } );
            }
    });
    }

    if ($('#data-table11').length !== 0) {
       //table 
    var table2 = $('#data-table11').DataTable({
        orderCellsTop: true,
         dom: 'lBfrtip',
            buttons: [
            ],
           autoWidth: false,
            ajax: {
                "url": "/rejectdetails",
                "dataType": "JSON",
                "type" : "POST",
                "data": function ( d ) {
                    d.scrid = "566";
                    /*    return JSON.stringify({"scrid" : id});*/
                }
            },
                       initComplete: function () {
                this.api().columns([0,2]).every( function () {
                    var column = this;
                    var select = $('<select style=\'width:100%\';></select>')
                            .appendTo( '#data-table11 thead tr:eq(1) th:eq('+column.index()+')')
                            .on( 'change', function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                        $(this).val()
                                );
 
                                column
                                        .search( val ? '^'+val+'$' : '', true, false )
                                        .draw();
                            } );
 
                    column.data().unique().sort().each( function ( d, j ) {
                        select.append( '<option value="'+d+'">'+d+'</option>' )
                    } );
                } );
            }
    });
    }
};

var TableManageButtons10 = function () {
	"use strict";
    return {
        //main function
        init: function () {
            handleDataTableButtons10();
        }
    };
}();