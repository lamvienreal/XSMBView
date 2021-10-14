var indexStart = 0;
var profitall = 0;
var profitTimeSeries = [];
var oxprofitTimeSeries = [];
var investingStartMoney = 20000;
var investTimeSeries = [investingStartMoney];
var oxinvestTimeSeries = ['start'];
var profitbymonths = [];
var profitmonth = 0;
var ox = [];
var basebet = [1, 3.5, 9.5, 24, 59.3, 146, 354.6, 862.2, 2094.9, 5088.6, 12359, 30015.8, 72896.4];
var lostday = 0;
var lostdaymax = 10;
var numberx2 = 10;
var startpoint = 10;
var invertings = [];
var oychart5 = [];
var oychart6 = [];
var oychart7 = [];
var investbymonth = 0;
var profitbymonthchart5 = 0;
var revenuebymonthchart7 = 0;
var f_start = indexStart,
    f_end = indexStart + numberx2;

//data for chart
var start_bet_linear = 10;
var profitTimeSerieslinear = [20000];
var oxprofitTimeSerieslinear = [];

//Save 100 table
var datax2statics = [];
var chartprioty = [0, 1, 2, 21, 22, 23, 25, 26, 27, 28, 29, 30, 32];
//chart
var ctx = document.getElementById('myChart');
var ctx1 = document.getElementById('myChart1');
var ctx2 = document.getElementById('myChart2');
var ctx3 = document.getElementById('myChart3');
var ctx4 = document.getElementById('myChart4');
var ctx5 = document.getElementById('myChart5');
var ctx6 = document.getElementById('myChart6');
var ctx7 = document.getElementById('myChart7');

var table = $('.itable>tbody');
var table1 = table[0];
var table2 = table[1];
var table3 = table[2];
var dataglobal = [];
//function
function moneybetDate(numberx2, pointbet, lostday) {
    if (lostday === 0)
        return numberx2 * pointbet;
    else if (lostday < 0)
        return 0;
    return numberx2 * pointbet * basebet[lostday];
}

//Calulator bet
function basebetCalulator(lostdays) {
    if (lostdays === 0)
        return 1;
    else if (lostdays < 0)
        return 0;
    //Số tiền win của n ngày và số tiền cược ngày hôm nay + số tiền cược các ngày trước
    return (((lostdays + 1) * ((17 - numberx2) * startpoint) + moneybetDate(numberx2, startpoint, lostdays - 1)) / 70);
}

function mainstatics(data) {
    var datax2statics_elment = datax2statics.find(function (datax2) {
        if (datax2.id === indexStart) {
            return datax2;
        }
    });
    if (datax2statics_elment === undefined) {
        datax2statics_elment = {
            id : indexStart,
            html: '',
            table: [],
            charts : []
        };
    }
    console.log(basebet);

    table1.innerHTML = '';
    table2.innerHTML = '';
    table3.innerHTML = '';

    var html = '';
    data.forEach(function (element) {
        
        var date = element.DatePredict.substring(0, 10);
        var x2elment = {
            datePredict: date,
            x2List: [],
            resultbet: 0
        };
        var rl_html = '<tr id="tr_'+ date +'">';
        rl_html += '<td class="text-center text-loterry">' + element.DatePredict.substring(0, 10) + '</td>';

        for (var i = f_start; i < f_end; i++) {
            var loto1 = element.LotoPredicts[i];
            var loto2 = null;
            if (i == f_end - 1) {
                loto2 = element.LotoPredicts[0];
            }
            else {
                loto2 = element.LotoPredicts[i + 1];
            }
            var x2 = (loto1.IsTrue ? '(' + loto1.LotoValue + ')' : loto1.LotoValue) + ' ' + (loto2.IsTrue ? '(' + loto2.LotoValue + ')' : loto2.LotoValue);
            rl_html += '<td class="text-center text-loterry ' + (loto1.IsTrue && loto2.IsTrue ? "text-true" : "text-fail") + '">' + x2 + '</td>';
            x2elment.x2List.push({
                loto1: loto1,
                loto2: loto2,
                isTrue: loto1.IsTrue && loto2.IsTrue
            });
        }
        rl_html += '<td id="resultx2_' + date + '" class="resultx2 text-center text-loterry">' + 0 + '</td>';
        rl_html += '</tr>';
        html += rl_html;
        datax2statics_elment.table.push(x2elment);
    });
    table1.innerHTML = html;

    //Tinh doanh thu và lợi nhuận
    for (var k = data.length - 1; k >= 0; k--) {
        var element = data[k];
        var profit = -1 * numberx2 * startpoint * basebet[lostday];
        var profitlinear = -1 * numberx2 * startpoint * start_bet_linear;
        investbymonth -= profitlinear;
        var date = element.DatePredict.substring(0, 10);
        
        var rl_html = $('#resultx2_' + date);
        for (var i = f_start; i < f_end; i++) {
            var loto1 = element.LotoPredicts[i];
            var loto2 = null;
            if (i == f_end - 1) {
                loto2 = element.LotoPredicts[0];
            }
            else {
                loto2 = element.LotoPredicts[i + 1];
            }

            if (loto1.IsTrue && loto2.IsTrue) {
                profit += 170 * basebet[lostday];
                profitlinear += 170 * start_bet_linear;
                revenuebymonthchart7 += 170 * start_bet_linear;
            }
        }

        rl_html.text(profit);
        rl_html.addClass((profit > 0 ? "text-true" : "text-fail"));
        profitall += profit;
        investingStartMoney += profit;
        profitTimeSeries.push(profitall);
        profitbymonthchart5 += profitlinear;
        profitTimeSerieslinear.push(profitTimeSerieslinear.length - 1 >= 0 ? profitTimeSerieslinear[profitTimeSerieslinear.length - 1] + profitlinear : profitlinear);
        oxprofitTimeSeries.push(date);
        investTimeSeries.push(investingStartMoney);
        oxinvestTimeSeries.push(date);
        if (profit < 0) {
            lostday++;
        }
        else {
            lostday = 0;
        }

        var dlable = date.substring(0, date.length - 2) + '01';
        //Check lable Exist
        var isExistLable = false;
        isExistLable = ox.find(function (label) {
            if (label === dlable) return true;
        });

        if (!isExistLable) {
            profitbymonths.push(profit);
            ox.push(dlable);
            oychart5.push(profitbymonthchart5);
            profitbymonthchart5 = 0;
            oychart7.push(revenuebymonthchart7);
            revenuebymonthchart7 = 0;
            oychart6.push(investbymonth);
            investbymonth = 0;
            invertings.push(0);
            //profitmonth = 0;
        }
        else {
            ox.find(function (el, index) {
                if (el === dlable) {
                    profitbymonths[index] += profit;
                    var invest = 0;
                    for (var i = 0; i <= lostday + 1; i++) {
                        invest += numberx2 * startpoint * basebet[i];
                    }

                    if (invertings[index] < invest) {
                        invertings[index] = invest;
                    }
                    return;
                }
            });
        }

        datax2statics_elment.table[k].resultbet = profit;
    };
    console.log(profitall);
    console.log(profitbymonths);
    console.log(invertings);
    datax2statics_elment.html = $('.itable>tbody')[0].innerHTML;
    
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ox,
            datasets: [{
                label: '# profit',
                data: profitbymonths,
                backgroundColor: 'green',
                //backgroundColor: [
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(54, 162, 235, 0.2)',
                //    'rgba(255, 206, 86, 0.2)',
                //    'rgba(75, 192, 192, 0.2)',
                //    'rgba(153, 102, 255, 0.2)',
                //    'rgba(255, 159, 64, 0.2)'
                //],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)',
                //    'rgba(75, 192, 192, 1)',
                //    'rgba(153, 102, 255, 1)',
                //    'rgba(255, 159, 64, 1)'
                //],
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx);

    //chart
    var myChart1 = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: oxprofitTimeSeries,
            datasets: [{
                label: '# profit',
                data: profitTimeSeries,
                backgroundColor: 'green',
                //backgroundColor: [
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(54, 162, 235, 0.2)',
                //    'rgba(255, 206, 86, 0.2)',
                //    'rgba(75, 192, 192, 0.2)',
                //    'rgba(153, 102, 255, 0.2)',
                //    'rgba(255, 159, 64, 0.2)'
                //],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)',
                //    'rgba(75, 192, 192, 1)',
                //    'rgba(153, 102, 255, 1)',
                //    'rgba(255, 159, 64, 1)'
                //],
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx1);

    //chart
    var myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: oxinvestTimeSeries,
            datasets: [{
                label: '# profit',
                data: investTimeSeries,
                backgroundColor: 'green',
                //backgroundColor: [
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(54, 162, 235, 0.2)',
                //    'rgba(255, 206, 86, 0.2)',
                //    'rgba(75, 192, 192, 0.2)',
                //    'rgba(153, 102, 255, 0.2)',
                //    'rgba(255, 159, 64, 0.2)'
                //],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)',
                //    'rgba(75, 192, 192, 1)',
                //    'rgba(153, 102, 255, 1)',
                //    'rgba(255, 159, 64, 1)'
                //],
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx2);

    //chart
    var myChart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ox,
            datasets: [{
                label: '# invest',
                data: invertings,
                backgroundColor: 'green',
                //backgroundColor: [
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(54, 162, 235, 0.2)',
                //    'rgba(255, 206, 86, 0.2)',
                //    'rgba(75, 192, 192, 0.2)',
                //    'rgba(153, 102, 255, 0.2)',
                //    'rgba(255, 159, 64, 0.2)'
                //],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)',
                //    'rgba(75, 192, 192, 1)',
                //    'rgba(153, 102, 255, 1)',
                //    'rgba(255, 159, 64, 1)'
                //],
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx3);


    //chart
    var myChart4 = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: oxinvestTimeSeries,
            datasets: [{
                label: '# profit linear',
                data: profitTimeSerieslinear,
                backgroundColor: 'green',
                //backgroundColor: [
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(54, 162, 235, 0.2)',
                //    'rgba(255, 206, 86, 0.2)',
                //    'rgba(75, 192, 192, 0.2)',
                //    'rgba(153, 102, 255, 0.2)',
                //    'rgba(255, 159, 64, 0.2)'
                //],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)',
                //    'rgba(75, 192, 192, 1)',
                //    'rgba(153, 102, 255, 1)',
                //    'rgba(255, 159, 64, 1)'
                //],
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx4);

    //chart
    var myChart5 = new Chart(ctx5, {
        type: 'bar',
        data: {
            labels: ox,
            datasets: [{
                label: '# profit linear',
                data: oychart5,
                backgroundColor: 'green',
                //backgroundColor: [
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(54, 162, 235, 0.2)',
                //    'rgba(255, 206, 86, 0.2)',
                //    'rgba(75, 192, 192, 0.2)',
                //    'rgba(153, 102, 255, 0.2)',
                //    'rgba(255, 159, 64, 0.2)'
                //],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)',
                //    'rgba(75, 192, 192, 1)',
                //    'rgba(153, 102, 255, 1)',
                //    'rgba(255, 159, 64, 1)'
                //],
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx5);

    //chart
    var myChart6 = new Chart(ctx6, {
        type: 'bar',
        data: {
            labels: ox,
            datasets: [{
                label: '# profit linear',
                data: oychart6,
                backgroundColor: 'green',
                //backgroundColor: [
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(54, 162, 235, 0.2)',
                //    'rgba(255, 206, 86, 0.2)',
                //    'rgba(75, 192, 192, 0.2)',
                //    'rgba(153, 102, 255, 0.2)',
                //    'rgba(255, 159, 64, 0.2)'
                //],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)',
                //    'rgba(75, 192, 192, 1)',
                //    'rgba(153, 102, 255, 1)',
                //    'rgba(255, 159, 64, 1)'
                //],
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx6);

    //chart
    var myChart7 = new Chart(ctx7, {
        type: 'bar',
        data: {
            labels: ox,
            datasets: [{
                label: '# profit linear',
                data: oychart7,
                backgroundColor: 'green',
                //backgroundColor: [
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(54, 162, 235, 0.2)',
                //    'rgba(255, 206, 86, 0.2)',
                //    'rgba(75, 192, 192, 0.2)',
                //    'rgba(153, 102, 255, 0.2)',
                //    'rgba(255, 159, 64, 0.2)'
                //],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)',
                //    'rgba(75, 192, 192, 1)',
                //    'rgba(153, 102, 255, 1)',
                //    'rgba(255, 159, 64, 1)'
                //],
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx7);

    datax2statics.push(datax2statics_elment);
}

d3.json("https://raw.githubusercontent.com/bienhuynh/XSMBView/main/data/result_full_predict_09_2021.json", function (error, data) {
    if (error)
        throw error;
    dataglobal = data;
    //basebet.splice(0, basebet.length);
    //for (var i = 0; i < lostdaymax; i++) {
    //    var result = basebetCalulator(i);
    //    basebet.push(result.toPrecision(2));
    //}

    for (var i = 0; i < basebet.length; i++) {
        basebet[i] = basebet[i] * 1;
    }
    mainstatics(data);
    $('#table-tile').text(indexStart);

    //for (;indexStart < 90; indexStart++) {
    //    mainstatics(data);
    //    $('#table-tile').text(indexStart);

    //    profitall = 0;
    //    profitTimeSeries = [];
    //    oxprofitTimeSeries = [];

    //profitTimeSerieslinear = [];
    //oxprofitTimeSerieslinear = [];
    //    investingStartMoney = 20000;
    //    investTimeSeries = [investingStartMoney];
    //    oxinvestTimeSeries = ['start'];
    //    profitbymonths = [];
    //    profitmonth = 0;
    //    ox = [];
    //    lostday = 0;
    //    invertings = [];
    //    f_start = indexStart;
    //    f_end = indexStart + numberx2;

    //    $('#myChart').remove();
    //    $('#myChart1').remove();
    //    $('#myChart2').remove();
    //    $('#myChart3').remove();
    //    $('#myChart4').remove();
    //    $('iframe.chartjs-hidden-iframe').remove();
    //    $('#ctx').append('<canvas style="background-color:white;" id="myChart" width="400" height="400"></canvas>'); 
    //    $('#ctx1').append('<canvas style="background-color:white;" id="myChart1" width="400" height="400"></canvas>'); 
    //    $('#ctx2').append('<canvas style="background-color:white;" id="myChart2" width="400" height="400"></canvas>'); 
    //    $('#ctx3').append('<canvas style="background-color:white;" id="myChart3" width="400" height="400"></canvas>'); 
    //    $('#ctx4').append('<canvas style="background-color:white;" id="myChart4" width="400" height="400"></canvas>'); 
    //    ctx = document.getElementById('myChart');
    //    ctx1 = document.getElementById('myChart1');
    //    ctx2 = document.getElementById('myChart2');
    //    ctx3 = document.getElementById('myChart3');
    //    ctx4 = document.getElementById('myChart4');
    //}

    //setInterval(function () {
    //    mainstatics(data);
    //    $('#table-tile').text(indexStart);
    //    indexStart++;
    //    if (indexStart > 90)
    //        indexStart = 0;
    //    profitall = 0;
    //    profitTimeSeries = [];
    //    oxprofitTimeSeries = [];
    //profitTimeSerieslinear = [];
    //oxprofitTimeSerieslinear = [];
    //    investingStartMoney = 20000;
    //    investTimeSeries = [investingStartMoney];
    //    oxinvestTimeSeries = ['start'];
    //    profitbymonths = [];
    //    profitmonth = 0;
    //    ox = [];
    //    lostday = 0;
    //    invertings = [];
    //    f_start = indexStart;
    //    f_end = indexStart + numberx2;
    //    setTimeout(function () {
            
    //    }, 59000);
    //    //$('#myChart').remove();
    //    //$('#myChart1').remove();
    //    //$('#myChart2').remove();
    //    //$('#myChart3').remove();
    //    //$('iframe.chartjs-hidden-iframe').remove();
    //    //$('#ctx').append('<canvas style="background-color:white;" id="myChart" width="400" height="400"></canvas>');
    //    //$('#ctx1').append('<canvas style="background-color:white;" id="myChart1" width="400" height="400"></canvas>');
    //    //$('#ctx2').append('<canvas style="background-color:white;" id="myChart2" width="400" height="400"></canvas>');
    //    //$('#ctx3').append('<canvas style="background-color:white;" id="myChart3" width="400" height="400"></canvas>');
    //    //ctx = document.getElementById('myChart');
    //    //ctx1 = document.getElementById('myChart1');
    //    //ctx2 = document.getElementById('myChart2');
    //    //ctx3 = document.getElementById('myChart3');
    //}, 60000);

    //Filter
    var html3 = '';
    var max_day_lost = 1;
    for (var k = data.length - 1 - max_day_lost; k >= 0; k--) {
        table2.innerHTML = '';
        var choselist = [];
        datax2statics.forEach(function (table, index) {
            var numberwin = 0;
            for (var iday = 0; iday < max_day_lost; iday++) {
                //var tr = $('#resultx2_' + date);
                var money = table.table[k + iday].resultbet;
                if (money > 0) {
                    numberwin++;
                }
            }
            if (numberwin == 0) {
                var row = table.table[k];
                choselist.push({
                    id: index,
                    row: row
                });
                var tr = document.createElement("tr");
                tr.id = 'tr2_' + row.datePredict;
                table2.append(tr);

                var td1 = document.createElement("td");
                td1.class = 'text-center text-loterry';
                td1.innerText = row.datePredict;
                tr.append(td1);

                row.x2List.forEach(function (el, idx) {
                    var tdn = document.createElement("td");
                    var x2 = (el.loto1.IsTrue ? '(' + el.loto1.LotoValue + ')' : el.loto1.LotoValue) + ' '
                        + (el.loto2.IsTrue ? '(' + el.loto2.LotoValue + ')' : el.loto2.LotoValue);
                    tdn.class = 'text-center text-loterry ' + (el.loto1.IsTrue && el.loto2.IsTrue ? 'text-true' : 'text-fail');
                    tdn.innerText = x2;
                    tr.append(tdn);
                });

                var td2 = document.createElement("td");
                td2.class = 'resultx2 text-center text-loterry';
                td2.id = 'resultx2_' + row.datePredict;
                td2.innerText = row.resultbet;
                tr.append(td2);
            }
        });
        console.log(choselist.length);
        var chose = choselist[0];
        if (k > 0 && choselist.length > 0) {
            var row = datax2statics[chose.id].table[k - 1];
            var rl_html = '<tr id="tr3_' + row.datePredict + '">';
            rl_html += '<td class="text-center text-loterry">' + row.datePredict + '</td>';
            row.x2List.forEach(function (el, idx) {
                var loto1 = el.loto1;
                var loto2 = el.loto2;
                var x2 = (loto1.IsTrue ? '(' + loto1.LotoValue + ')' : loto1.LotoValue) + ' ' + (loto2.IsTrue ? '(' + loto2.LotoValue + ')' : loto2.LotoValue);
                rl_html += '<td class="text-center text-loterry ' + (loto1.IsTrue && loto2.IsTrue ? "text-true" : "text-fail") + '">' + x2 + '</td>';
            });
            rl_html += '<td id="resultx2_3_' + row.datePredict + '" data-id="' + datax2statics[chose.id].id + '" class="resultx2_3 text-center text-loterry">' + row.resultbet + '</td>';
            rl_html += '</tr>';
            html3 = rl_html + html3;
            table3.innerHTML = html3;
        }
    }

    profitall = 0;
    profitTimeSeries = [];
    oxprofitTimeSeries = [];
    profitTimeSerieslinear = [20000];
    oxprofitTimeSerieslinear = [];
    investingStartMoney = 20000;
    investTimeSeries = [investingStartMoney];
    oxinvestTimeSeries = ['start'];
    profitbymonths = [];
    profitmonth = 0;
    ox = [];
    lostday = 0;
    invertings = [];
    investbymonth = 0;

    $('#myChart').remove();
    $('#myChart1').remove();
    $('#myChart2').remove();
    $('#myChart3').remove();
    $('#myChart4').remove();
    $('#myChart5').remove();
    $('#myChart6').remove();
    $('#myChart7').remove();
    $('iframe.chartjs-hidden-iframe').remove();
    $('#ctx').append('<canvas style="background-color:white;" id="myChart" width="400" height="400"></canvas>');
    $('#ctx1').append('<canvas style="background-color:white;" id="myChart1" width="400" height="400"></canvas>');
    $('#ctx2').append('<canvas style="background-color:white;" id="myChart2" width="400" height="400"></canvas>');
    $('#ctx3').append('<canvas style="background-color:white;" id="myChart3" width="400" height="400"></canvas>');
    $('#ctx4').append('<canvas style="background-color:white;" id="myChart4" width="400" height="400"></canvas>');
    $('#ctx5').append('<canvas style="background-color:white;" id="myChart5" width="400" height="400"></canvas>');
    $('#ctx6').append('<canvas style="background-color:white;" id="myChart6" width="400" height="400"></canvas>');
    $('#ctx7').append('<canvas style="background-color:white;" id="myChart7" width="400" height="400"></canvas>');
    ctx = document.getElementById('myChart');
    ctx1 = document.getElementById('myChart1');
    ctx2 = document.getElementById('myChart2');
    ctx3 = document.getElementById('myChart3');
    ctx4 = document.getElementById('myChart4');
    ctx5 = document.getElementById('myChart5');
    ctx6 = document.getElementById('myChart6');
    ctx7 = document.getElementById('myChart7');

    //Tinh doanh thu và lợi nhuận
    for (var k1 = data.length - 1 - max_day_lost - 1; k1 >= 0; k1--) {
        var tmp = data[k1];
        var date = tmp.DatePredict.substring(0, 10);;
        var rl_html = $('#resultx2_3_' + date);

        var idtable = rl_html.attr('data-id');
        if (k1 >= 0 && idtable !== undefined) {
            var row = datax2statics[idtable].table[k1];
            var profit = -1 * numberx2 * startpoint * basebet[lostday];
            var profitlinear = -1 * numberx2 * startpoint * start_bet_linear;
            investbymonth -= profitlinear;
            row.x2List.forEach(function (el, idx) {
                var loto1 = el.loto1;
                var loto2 = el.loto2;

                if (loto1.IsTrue && loto2.IsTrue) {
                    profit += 170 * basebet[lostday];
                    profitlinear += 170 * start_bet_linear;
                    revenuebymonthchart7 += 170 * start_bet_linear;
                }
            });
            rl_html.text(profit);
            rl_html.addClass((profit > 0 ? "text-true" : "text-fail"));
            profitall += profit;
            investingStartMoney += profit;
            profitTimeSeries.push(profitall);
            profitbymonthchart5 += profitlinear;
            profitTimeSerieslinear.push(profitTimeSerieslinear.length - 1 >= 0 ? profitTimeSerieslinear[profitTimeSerieslinear.length - 1] + profitlinear : profitlinear);
            oxprofitTimeSeries.push(date);
            investTimeSeries.push(investingStartMoney);
            oxinvestTimeSeries.push(date);
            if (profit < 0) {
                lostday++;
            }
            else {
                lostday = 0;
            }

            var dlable = date.substring(0, date.length - 2) + '01';
            //Check lable Exist
            var isExistLable = false;
            isExistLable = ox.find(function (label) {
                if (label === dlable) return true;
            });

            if (!isExistLable) {
                profitbymonths.push(profit);
                ox.push(dlable);
                oychart5.push(profitbymonthchart5);
                profitbymonthchart5 = 0;
                oychart7.push(revenuebymonthchart7);
                revenuebymonthchart7 = 0;
                oychart6.push(investbymonth);
                investbymonth = 0;
                invertings.push(0);
                //profitmonth = 0;
            }
            else {
                ox.find(function (el, index) {
                    if (el === dlable) {
                        profitbymonths[index] += profit;
                        var invest = 0;
                        for (var i = 0; i <= lostday + 1; i++) {
                            invest += numberx2 * startpoint * basebet[i];
                        }

                        if (invertings[index] < invest) {
                            invertings[index] = invest;
                        }
                        return;
                    }
                });
            }
        }
    };
    console.log(profitall);
    console.log(profitbymonths);
    console.log(invertings);
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ox,
            datasets: [{
                label: '# profit',
                data: profitbymonths,
                backgroundColor: 'green',
                //backgroundColor: [
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(54, 162, 235, 0.2)',
                //    'rgba(255, 206, 86, 0.2)',
                //    'rgba(75, 192, 192, 0.2)',
                //    'rgba(153, 102, 255, 0.2)',
                //    'rgba(255, 159, 64, 0.2)'
                //],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)',
                //    'rgba(75, 192, 192, 1)',
                //    'rgba(153, 102, 255, 1)',
                //    'rgba(255, 159, 64, 1)'
                //],
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });

    //chart
    var myChart1 = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: oxprofitTimeSeries,
            datasets: [{
                label: '# profit',
                data: profitTimeSeries,
                backgroundColor: 'green',
                //backgroundColor: [
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(54, 162, 235, 0.2)',
                //    'rgba(255, 206, 86, 0.2)',
                //    'rgba(75, 192, 192, 0.2)',
                //    'rgba(153, 102, 255, 0.2)',
                //    'rgba(255, 159, 64, 0.2)'
                //],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)',
                //    'rgba(75, 192, 192, 1)',
                //    'rgba(153, 102, 255, 1)',
                //    'rgba(255, 159, 64, 1)'
                //],
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });

    //chart
    var myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: oxinvestTimeSeries,
            datasets: [{
                label: '# profit',
                data: investTimeSeries,
                backgroundColor: 'green',
                //backgroundColor: [
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(54, 162, 235, 0.2)',
                //    'rgba(255, 206, 86, 0.2)',
                //    'rgba(75, 192, 192, 0.2)',
                //    'rgba(153, 102, 255, 0.2)',
                //    'rgba(255, 159, 64, 0.2)'
                //],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)',
                //    'rgba(75, 192, 192, 1)',
                //    'rgba(153, 102, 255, 1)',
                //    'rgba(255, 159, 64, 1)'
                //],
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });

    //chart
    var myChart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ox,
            datasets: [{
                label: '# invest',
                data: invertings,
                backgroundColor: 'green',
                //backgroundColor: [
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(54, 162, 235, 0.2)',
                //    'rgba(255, 206, 86, 0.2)',
                //    'rgba(75, 192, 192, 0.2)',
                //    'rgba(153, 102, 255, 0.2)',
                //    'rgba(255, 159, 64, 0.2)'
                //],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)',
                //    'rgba(75, 192, 192, 1)',
                //    'rgba(153, 102, 255, 1)',
                //    'rgba(255, 159, 64, 1)'
                //],
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });

    //chart
    var myChart4 = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: oxinvestTimeSeries,
            datasets: [{
                label: '# profit linear',
                data: profitTimeSerieslinear,
                backgroundColor: 'green',
                //backgroundColor: [
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(54, 162, 235, 0.2)',
                //    'rgba(255, 206, 86, 0.2)',
                //    'rgba(75, 192, 192, 0.2)',
                //    'rgba(153, 102, 255, 0.2)',
                //    'rgba(255, 159, 64, 0.2)'
                //],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)',
                //    'rgba(75, 192, 192, 1)',
                //    'rgba(153, 102, 255, 1)',
                //    'rgba(255, 159, 64, 1)'
                //],
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });

    //chart
    var myChart5 = new Chart(ctx5, {
        type: 'bar',
        data: {
            labels: ox,
            datasets: [{
                label: '# profit linear',
                data: oychart5,
                backgroundColor: 'green',
                //backgroundColor: [
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(54, 162, 235, 0.2)',
                //    'rgba(255, 206, 86, 0.2)',
                //    'rgba(75, 192, 192, 0.2)',
                //    'rgba(153, 102, 255, 0.2)',
                //    'rgba(255, 159, 64, 0.2)'
                //],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)',
                //    'rgba(75, 192, 192, 1)',
                //    'rgba(153, 102, 255, 1)',
                //    'rgba(255, 159, 64, 1)'
                //],
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    
    //chart
    var myChart6 = new Chart(ctx6, {
        type: 'bar',
        data: {
            labels: ox,
            datasets: [{
                label: '# profit linear',
                data: oychart6,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });

    //chart
    var myChart7 = new Chart(ctx7, {
        type: 'bar',
        data: {
            labels: ox,
            datasets: [{
                label: '# profit linear',
                data: oychart7,
                backgroundColor: 'green',
                //backgroundColor: [
                //    'rgba(255, 99, 132, 0.2)',
                //    'rgba(54, 162, 235, 0.2)',
                //    'rgba(255, 206, 86, 0.2)',
                //    'rgba(75, 192, 192, 0.2)',
                //    'rgba(153, 102, 255, 0.2)',
                //    'rgba(255, 159, 64, 0.2)'
                //],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)',
                //    'rgba(75, 192, 192, 1)',
                //    'rgba(153, 102, 255, 1)',
                //    'rgba(255, 159, 64, 1)'
                //],
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
});


$('#table-id').on('change', function (e, v) {
    indexStart = parseInt($(this).val());
    $('#table-tile').text(indexStart);
    console.log(indexStart);
    profitall = 0;
    profitTimeSeries = [];
    oxprofitTimeSeries = [];
    investingStartMoney = 20000;
    investTimeSeries = [investingStartMoney];
    oxinvestTimeSeries = ['start'];
    profitbymonths = [];
    profitmonth = 0;
    ox = [];
    lostday = 0;
    invertings = [];
    oychart6 = [];
    f_start = indexStart;
    f_end = indexStart + numberx2;

    $('#myChart').remove();
    $('#myChart1').remove();
    $('#myChart2').remove();
    $('#myChart3').remove();
    $('#myChart4').remove();
    $('#myChart5').remove();
    $('#myChart6').remove();
    $('#myChart7').remove();
    $('iframe.chartjs-hidden-iframe').remove();
    $('#ctx').append('<canvas style="background-color:white;" id="myChart" width="400" height="400"></canvas>');
    $('#ctx1').append('<canvas style="background-color:white;" id="myChart1" width="400" height="400"></canvas>');
    $('#ctx2').append('<canvas style="background-color:white;" id="myChart2" width="400" height="400"></canvas>');
    $('#ctx3').append('<canvas style="background-color:white;" id="myChart3" width="400" height="400"></canvas>');
    $('#ctx4').append('<canvas style="background-color:white;" id="myChart4" width="400" height="400"></canvas>');
    $('#ctx5').append('<canvas style="background-color:white;" id="myChart5" width="400" height="400"></canvas>');
    $('#ctx6').append('<canvas style="background-color:white;" id="myChart6" width="400" height="400"></canvas>');
    $('#ctx7').append('<canvas style="background-color:white;" id="myChart7" width="400" height="400"></canvas>');
    ctx = document.getElementById('myChart');
    ctx1 = document.getElementById('myChart1');
    ctx2 = document.getElementById('myChart2');
    ctx3 = document.getElementById('myChart3');
    ctx4 = document.getElementById('myChart4');
    ctx5 = document.getElementById('myChart5');
    ctx6 = document.getElementById('myChart6');
    ctx7 = document.getElementById('myChart7');

    mainstatics(dataglobal);
});