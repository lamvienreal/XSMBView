﻿var tablehead = $('.itable>thead');
tablehead[0].innerHTML = '';
var htmlheader = '<tr>';
htmlheader += '<th scope="col">Date Predict</th>';
htmlheader += '<th scope="col">Total Point</th>';
var cols = [37, 27, 44, 71, 24];
var oxchart1 = ['start'],
    oxchart2 = ['start'],
    oxchart3 = ['start'];
var oychart1 = [1000],
    oychart2 = [1000],
    oychart3 = [1000];

var ctx1 = document.getElementById('myChart1');
var ctx2 = document.getElementById('myChart2');
var ctx3 = document.getElementById('myChart3');

for (var i = 0; i <= cols.length - 1; i++) {
    htmlheader += '<th scope="col">L' + cols[i] + '</th>';
}

htmlheader += '<th scope="col">3D 01</th>';
htmlheader += '<th scope="col">3D 02</th>';
htmlheader += '<th scope="col">X2 Result</th>';
htmlheader += '<th scope="col">X3 Result</th>';
htmlheader += '<th scope="col">Total Result</th>';
htmlheader += '<th scope="col">Date Create</th>';
htmlheader += '</tr>';
tablehead[0].innerHTML = htmlheader;

function Oversem(num) {
    var result = 1;
    for (i = 1; i <= num; i++) {
        result *= i;
    }
    return result;
}

function calulatepercentwin(data) {
    var percentwin100lo = [];
    for (var i = 0; i < 100; i++) {
        percentwin100lo.push({
            Lx: i + 1,
            percent: 0
        });
        var numberdaywin = 0;
        for (var k = data.length - 1; k >= 0; k--) {
            var element = data[k];
            var date = element.DatePredict.substring(0, 10);
            var loto = element.LotoPredicts[i];
            if (loto.IsTrue) {
                numberdaywin++;
            }
        };
        percentwin100lo[i].percent = (numberdaywin / data.length) * 100;
    }
    percentwin100lo.sort(function (a, b) { return b.percent - a.percent });
    return percentwin100lo;
}

d3.json("https://raw.githubusercontent.com/bienhuynh/XSMBView/main/data/result_full_predict_09_2021.json", function (error, data) {
    if (error)
        throw error;

    var table = $('.itable>tbody');
    table[0].innerHTML = '';
    var html = '';
    var numberwin3 = 0;
    var totalmoney = 0;
    var index = 0;
    for (var i_data = data.length - 1; i_data >= 0; i_data--) {
        var element = data[i_data];
        index++;
        //Calulate percent 100 days
        var d = index - 100 >= 0 ? index - 100 : 0;
        if (index > 99000) {
            var data_100 = [];
            for (; d < index; d++) {
                data_100.push(data[d]);
            }
            var percent100lo = calulatepercentwin(data_100);
            cols[0] = percent100lo[0].Lx;
            cols[1] = percent100lo[1].Lx;
            cols[2] = percent100lo[2].Lx;
        }
        var datestr = element.DatePredict.substring(0, 10);
        oxchart1.push(datestr);
        oxchart2.push(datestr);
        oxchart3.push(datestr);
        var rl_html = '<tr>';
        rl_html += '<th scope="row">' + datestr + '</th>';
        rl_html += '<td data-title="Total Point">' + element.GoldPointPredict + '</td>';
        var iswin = 0;
        var loto3d = [];
        var profitloto3d = 0;
        var startpoint3d = 1;

        cols.forEach(function (col, index) {
            var loto = element.LotoPredicts[col - 1];
            if (index === 0 || index === 1) {
                loto3d.push(loto);
                profitloto3d += loto.IsTrue ? (972 - 230) * startpoint3d : -230 * startpoint3d;
            }
            var topvalue = (loto.IsTrue ? '(' + loto.LotoValue + ')' : loto.LotoValue) + ' ';
            rl_html += '<td class="' + (loto.IsTrue ? "text-true" : "text-fail") + '" data-title="' + 'L' + (col) + '">' + topvalue + '</td>';
            iswin += loto.IsTrue ? 1 : 0;
        });

        if (iswin > 0) {
            numberwin3++;
        }

        //Calulate X2 Result 

        var LXXs = cols;
        var f_start = 0;
        var f_end = LXXs.length;
        var x2wins = [];
        //var startpointx2 = 20 * startpoint3d;
        var startpointx2 = 10;
        var profitx2 = -1 * (LXXs.length * (LXXs.length - 1) / 2) * startpointx2;
        for (var i = f_start; i < f_end; i++) {
            for (j = i + 1; j < f_end; j++) {
                var loto1 = element.LotoPredicts[LXXs[i] - 1];
                var loto2 = element.LotoPredicts[LXXs[j] - 1];

                if (loto1.IsTrue && loto2.IsTrue) {
                    x2wins.push('(' + loto1.LotoValue + ')' + ' ' + '(' + loto2.LotoValue + ')');
                    profitx2 += 17 * startpointx2;
                    //oychart1.push(oychart1[oychart1.length - 1] + profitx2);
                    //profitlinear += 170 * start_bet_linear;
                    //revenuebymonthchart7 += 170 * start_bet_linear;
                }
            }
        }

        //Calulate X3 Result 
        f_start = 0;
        f_end = LXXs.length;
        var x3wins = [];
        //var startpointx3 = startpointx2 / 2;
        var startpointx3 = 10;
        var profitx3 = -1 * (Oversem(LXXs.length) / (Oversem(3) * Oversem(LXXs.length - 3))) * startpointx3;
        for (var i = f_start; i < f_end; i++) {
            for (j = i + 1; j < f_end; j++) {
                for (var g = j + 1; g < f_end; g++) {
                    var loto1 = element.LotoPredicts[LXXs[i] - 1];
                    var loto2 = element.LotoPredicts[LXXs[j] - 1];
                    var loto3 = element.LotoPredicts[LXXs[g] - 1];
                    if (loto1.IsTrue && loto2.IsTrue && loto3.IsTrue) {
                        x3wins.push('(' + loto1.LotoValue + ')' + ' ' + '(' + loto2.LotoValue + ')' + ' ' + '(' + loto3.LotoValue + ')');
                        profitx3 += 74 * startpointx3;
                        //oychart2.push(oychart2[oychart2.length - 1] + profitx3);
                        //profitlinear += 740 * start_bet_linear;
                        //revenuebymonthchart7 += 740 * start_bet_linear;
                    }
                }
            }
        }
        var totalprofilt = profitloto3d + profitx2 + profitx3;
        totalmoney += totalprofilt;

        oychart1.push(oychart1[oychart1.length - 1] + profitx2);
        oychart2.push(oychart2[oychart2.length - 1] + profitx3);
        oychart3.push(oychart3[oychart3.length - 1] + profitx2 + profitx3);
        rl_html += '<td class="' + (loto3d[0].IsTrue ? "text-true" : "text-fail") + '" data-title="3D 01">' + loto3d[0].LotoValue + '</td>';
        rl_html += '<td class="' + (loto3d[1].IsTrue ? "text-true" : "text-fail") + '" data-title="3D 02">' + loto3d[1].LotoValue + '</td>';
        rl_html += '<td class="' + (x2wins.length > 0 ? "text-true" : "text-fail") + '" data-title="X2 Result">' + x2wins + '</td>';
        rl_html += '<td class="' + (x3wins.length > 0 ? "text-true" : "text-fail") + '" data-title="X3 Result">' + x3wins + '</td>';
        rl_html += '<td class="' + (totalprofilt > 0 ? "text-true" : "text-fail") + '" data-title="Total Result">' + totalprofilt + '</td>';
        rl_html += '<td data-title="Date Create">' + element.TimePredict + '</td>';
        rl_html += '</tr>';
        html = rl_html + html;
    };

    //chart
    var myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: oxchart1,
            datasets: [{
                label: '# profit',
                data: oychart1,
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
    var myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: oxchart2,
            datasets: [{
                label: '# profit',
                data: oychart2,
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
    var myChart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: oxchart3,
            datasets: [{
                label: '# profit',
                data: oychart3,
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
    console.log(totalmoney);
    $('#percent').text(numberwin3 * 100 / data.length + '%');
    table[0].innerHTML = html;
});