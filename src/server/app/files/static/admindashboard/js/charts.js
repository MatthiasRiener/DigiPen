function printDailyLogins(dailyData) {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("dashboardMain-left-bottom-inner", am4charts.XYChart);
let title = chart.titles.create();
title.text = "User Interactions";
title.fontSize = 25;
title.marginBottom = 30;
title.align = "left"

var data = [];

for(const [key, value] of Object.entries(dailyData)) {
    data.push({date:key, value: value});
}

chart.data = data;

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 60;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.maxPrecision = 0;

// Create series
var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "value";
series.dataFields.dateX = "date";
series.tooltipText = "{value}"
series.strokeWidth = 3;
series.tensionX = 0.77;
series.stroke = am4core.color("#383838");

series.tooltip.pointerOrientation = "vertical";

chart.cursor = new am4charts.XYCursor();
chart.cursor.snapToSeries = series;
chart.cursor.xAxis = dateAxis;

//chart.scrollbarY = new am4core.Scrollbar();
var scrollbarX = new am4charts.XYChartScrollbar();
scrollbarX.series.push(series);
scrollbarX.minHeight = 50;
scrollbarX.background.fillOpactiy = 0.2;
chart.scrollbarX = scrollbarX;

} // end am4core.ready()