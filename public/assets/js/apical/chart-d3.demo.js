/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7
Version: 2.1.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v2.1/admin/html/
*/

var blue		= '#348fe2',
    blueLight	= '#5da5e8',
    blueDark	= '#1993E4',
    aqua		= '#49b6d6',
    aquaLight	= '#6dc5de',
    aquaDark	= '#3a92ab',
    green		= '#00acac',
    greenLight	= '#33bdbd',
    greenDark	= '#008a8a',
    orange		= '#f59c1a',
    orangeLight	= '#f7b048',
    orangeDark	= '#c47d15',
    dark		= '#2d353c',
    grey		= '#b6c2c9',
    purple		= '#727cb6',
    purpleLight	= '#8e96c5',
    purpleDark	= '#5b6392',
    red         = '#ff5b57';

var handlePieAndDonutChart = function() {
    "use strict";
    
    var pieChartData = [
        { 'label': 'Pending tasks', 'value' : 69, 'color': red, 'id': '1' }, 
        { 'label': 'Total tasks', 'value' : 112, 'color': aqua , 'id': '2'}, 
        { 'label': 'Completed tasks', 'value' : 32, 'color': green , 'id': '3'}, 
        { 'label': 'Unassigned task', 'value' : 11, 'color': orange , 'id': '4'}
    ];

    nv.addGraph(function() {
        var pieChart = nv.models.pieChart()
          .x(function(d) { return d.label })
          .y(function(d) { return d.value })
          .showLabels(true)
          .labelThreshold(.05);

        d3.select('#nv-pie-chart').append('svg')
            .datum(pieChartData)
            .transition().duration(350)
            .call(pieChart);
 pieChart.pie.dispatch.on("elementClick", function(e) {
   // alert("You've clicked " + e.data.id);
   window.location = "/taskstatus";
  });
        return pieChart;
    });
};






var ChartNvd3 = function () {
	"use strict";
    return {
        //main function
        init: function () {
            handlePieAndDonutChart();
        }
    };
}();