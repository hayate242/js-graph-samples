
    var limit = 1000;
    
    var y = 0;
    var data = [];
    var dataSeries = { type: "line" };
    var dataPoints = [];
    for (var i = 0; i < limit; i += 1) {
        y += (Math.random() * 10 - 5);
        dataPoints.push({
            x: i - limit / 2,
            y: y
        });
    }
    dataSeries.dataPoints = dataPoints;
    data.push(dataSeries);

    var chart = new CanvasJS.Chart("lineChartContainer", {
        animationEnabled: true,
        zoomEnabled: true,
        title:{
            text: "折れ線グラフ" 
        },
        axisY :{
            includeZero:false
        },
        data: data  // random generator below
    });
    chart.render();
    
