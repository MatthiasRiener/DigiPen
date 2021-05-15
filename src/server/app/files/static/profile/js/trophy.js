$(document).ready(dailyGoalPrinterPresentations(7, 10));

function dailyGoalPrinterPresentations(todaysNumber, goal) {

    am4core.useTheme(am4themes_animated);

    var chart = am4core.create("trophyChart", am4charts.RadarChart);

    // Add data
    chart.data = [{
        "category": "",
        "value": todaysNumber / goal * 100,
        // "value1": 40,
        "full": 100
    },];

    // Make chart not full circle
    chart.startAngle = 0;
    chart.endAngle = 360;
    chart.innerRadius = am4core.percent(80);

    // Set number format
    chart.numberFormatter.numberFormat = "";

    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.strokeOpacity = 0;



    categoryAxis.renderer.minGridDistance = 100;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 100;
    categoryAxis.renderer.grid.push(new am4charts.Grid()).disabled = true;
    valueAxis.renderer.grid.push(new am4charts.Grid()).disabled = true;
    // valueAxis.strictMinMax = false;

    // Create series
    var series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueX = "full";
    series1.dataFields.categoryY = "category";
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    series1.columns.template.fillOpacity = 0.08;
    series1.columns.template.cornerRadiusTopLeft = 100;
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 100;

    var label = chart.seriesContainer.createChild(am4core.Label);
    label.text = Math.round(todaysNumber / goal * 100) + "%";
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fontSize = 40;
    label.fontWeight = 600;
    label.fill = am4core.color("white");

    var series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = "value";
    series2.dataFields.categoryY = "category";
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
    series2.columns.template.radarColumn.cornerRadius = 100;
    series2.columns.template.fill = new am4core.color("white");
    series1.columns.template.fill = new am4core.color("white");



    var series3 = chart.series.push(new am4charts.RadarColumnSeries());
    series3.dataFields.valueX = "value1";
    series3.dataFields.categoryY = "category";
    series3.clustered = false;
    series3.columns.template.strokeWidth = 0;
    series3.columns.template.radarColumn.cornerRadius = 0;
}