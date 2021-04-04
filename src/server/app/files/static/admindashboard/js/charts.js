function showDailyLogins(dailyData) {

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


    for (const [key, value] of Object.entries(dailyData)) {
        data.push({ date: key * 1000, value: value });
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


// Title for current users
var axisUserCount;



function showDailyActiveUsers(dailyData) {
    console.clear()
    console.log(dailyData)

    // Create chart instance
    var chart = am4core.create("dashboardBottom-left-left-top-inner", am4charts.XYChart);

    var data = [];

    let completeUserCount = [];

    for (const [key, value] of Object.entries(dailyData)) {
        console.log(value)
        let label = new Date(key * 1000);


        value.forEach((user) => {
            if (!completeUserCount.includes(user)) {
                completeUserCount.push(user);
            }
        });

        data.push({ day: label.toDateString(), active: value.length });
    }

    chart.data = data;

    // Create axes

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "day";


    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.minimum = 0;
    valueAxis.maxPrecision = 0;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "active";
    series.dataFields.categoryX = "day";
    series.name = "Visits";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;



    var topContainer = chart.chartContainer.createChild(am4core.Container);
    topContainer.layout = "absolute";
    topContainer.toBack();
    topContainer.paddingBottom = 15;
    topContainer.width = am4core.percent(100);
    topContainer.height = 80;


    var axisTitle = topContainer.createChild(am4core.Label);
    axisTitle.text = "Active Users";
    axisTitle.fontSize = 25;
    axisTitle.marginBottom = 20;
    axisTitle.align = "left"




    axisUserCount = topContainer.createChild(am4core.Label);
    axisUserCount.fontWeight = 800;
    axisUserCount.fontSize = 30;
    axisUserCount.align = "right";
    axisUserCount.paddingLeft = 10;


    var axisSubtitle = topContainer.createChild(am4core.Label);
    axisSubtitle.text = "Logins per Day";
    axisSubtitle.fontWeight = 400;
    axisSubtitle.align = "left";
    axisSubtitle.valign = "bottom"
    axisSubtitle.marginBottom = 10;


    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;


    chart.events.on("beforedatavalidated", function (ev) {

        chart.data.sort(function (a, b) {

            console.log(a)
            console.log(Date.parse(a.day) - (Date.parse(b.day)));
            return (Date.parse(a.day) - (Date.parse(b.day)));
        });
    });

}


function changeCurrentUserCount(num) {
    axisUserCount.text = num;
    $('#currently-active-users-count').html(num);

}


function getCurrentUserCount() {
    sendRequestToServer({ type: "GET", url: "/admin/getCurrentOnlineUsers" }).then(data => {
        axisUserCount.text = data.res;
        $('#currently-active-users-count').html(data.res);
    });
}



function createCountryChart(countryData) {


    am4core.useTheme(am4themes_animated);

    var chart = am4core.create("dashboardBottom-right-inner", am4maps.MapChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Miller();

    var title = chart.chartContainer.createChild(am4core.Label);
    title.text = "Location of Users";
    title.fontSize = 20;
    title.paddingTop = 30;
    title.align = "left";
    title.zIndex = 100;

    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value.value.formatNumber('#.0')}";
    polygonSeries.heatRules.push({
        property: "fill",
        target: polygonSeries.mapPolygons.template,
        min: am4core.color("#ffffff"),
        max: am4core.color("#383838")
    });
    polygonSeries.useGeodata = true;

    // add heat legend
    var heatLegend = chart.chartContainer.createChild(am4maps.HeatLegend);
    heatLegend.valign = "bottom";
    heatLegend.align = "left";
    heatLegend.width = am4core.percent(100);
    heatLegend.series = polygonSeries;
    heatLegend.orientation = "horizontal";
    heatLegend.padding(20, 20, 20, 20);
    heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
    heatLegend.valueAxis.renderer.minGridDistance = 40;

    polygonSeries.mapPolygons.template.events.on("over", event => {
        handleHover(event.target);
    });

    polygonSeries.mapPolygons.template.events.on("hit", event => {
        handleHover(event.target);
    });

    function handleHover(mapPolygon) {
        if (!isNaN(mapPolygon.dataItem.value)) {
            heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
        } else {
            heatLegend.valueAxis.hideTooltip();
        }
    }

    polygonSeries.mapPolygons.template.strokeOpacity = 0.4;
    polygonSeries.mapPolygons.template.events.on("out", event => {
        heatLegend.valueAxis.hideTooltip();
    });

    chart.zoomControl = new am4maps.ZoomControl();
    chart.zoomControl.valign = "top";

    chart.homeZoomLevel = 5;
    chart.homeGeoPoint = {
        latitude: 52,
        longitude: 11
    };

    // life expectancy data


    for (const [key, value] of Object.entries(countryData)) {
        console.log(value)
        polygonSeries.data.push({id: key, value: value.length})
    }

    // excludes Antarctica
    polygonSeries.exclude = ["AQ"];
}