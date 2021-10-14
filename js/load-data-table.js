var oxchart1 = ['start'],
    oychart1 = [20000];
var oxchart2 = ['start'],
    oychart2 = [20000];
var oxchart2_1 = ['start'],
    oychart2_1 = [5000];
var oxchart3 = ['start'],
    oychart3 = [40000];
var oxchart4 = ['start'],
    oychart4 = [40000];
var oxchart5 = ['start'],
    oychart5 = [40000];
var oxchart6 = ['start'],
    oychart6 = [40000];
var oxchart7 = ['start'],
    oychart7 = [50000];
var oxchart8 = ['start'],
    oychart8 = [40000];
var oxchart8_1 = [],
    oychart8_1 = [];

var dayoffs = ['2020-01-24', '2020-01-25', '2020-01-26', '2020-01-27', '2020-04-01', '2020-04-02', '2020-04-03', '2020-04-04', '2020-04-05', '2020-04-06', '2020-04-07', '2020-04-08', '2020-04-09', '2020-04-10',
    '2020-04-11', '2020-04-12', '2020-04-13', '2020-04-14', '2020-04-15', '2020-04-16', '2020-04-17', '2020-04-18', '2020-04-19', '2020-04-20'
    , '2020-04-21', '2020-04-22', '2020-04-23'];

var start_point = 10;
var start_point_x2_x3 = 100;
var profitbymonthchart8_1 = [];

d3.json("https://raw.githubusercontent.com/bienhuynh/XSMBView/main/data/result_predict.json", function (error, data) {
    if (error)
        throw error;
    var table = $('.itable>tbody');
    table[0].innerHTML = '';
    var html = '';
    var now = new Date(Date.now());
    var dEnd = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate(), 12, 30, 0);
    var dateNowStr = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
    var isAdd = true;

    var top1value = [];
    var top2value = [];
    var top3value = [];
    var top4value = [];
    var top5value = [];
    var top6value = [];
    var top7value = [];

    var top1win = [];
    var top2win = [];
    var top3win = [];
    var top4win = [];
    var top5win = [];
    var top6win = [];
    var top7win = [];

    for (var k = data.top1.length - 1; k >= 0; k--) {
        var element = data.top1[k];
        var datePredict = element.DatePredict.substring(0, 10);
        if (!dayoffs.includes(datePredict)) {
            if (datePredict === dateNowStr) {
                isAdd = !isAdd;
            }
            var topvalue = '';
            oxchart1.push(datePredict);
            element.LotoPredicts.forEach(function (loto) {
                topvalue += (loto.IsTrue ? '(' + loto.LotoValue + ')' : loto.LotoValue) + ' ';
                oychart1.push(oychart1[oychart1.length - 1] + (loto.IsTrue ? (99 * loto.QtyLoto - 27) * start_point : -27 * start_point));
            });
            top1value.push(topvalue);
        }
    };
    for (var k = data.top2.length - 1; k >= 0; k--) {
        var element = data.top2[k];
        var datePredict = element.DatePredict.substring(0, 10);
        if (!dayoffs.includes(datePredict)) {
            if (datePredict === dateNowStr) {
                isAdd = !isAdd;
            }
            var topvalue = '';
            oxchart2.push(datePredict);
            oxchart2_1.push(datePredict);
            var profit = 0;
            var numberlotowin = 0;
            element.LotoPredicts.forEach(function (loto) {
                topvalue += (loto.IsTrue ? '(' + loto.LotoValue + ')' : loto.LotoValue) + ' ';
                profit += (loto.IsTrue ? (99 * loto.QtyLoto - 27) * start_point : -27 * start_point);
                if (loto.IsTrue)
                    numberlotowin++;
            });
            oychart2.push(oychart2[oychart2.length - 1] + profit);

            //X2
            profit = -1 * start_point_x2_x3;
            if (numberlotowin == 2) {
                profit += 17 * start_point_x2_x3;
            }
            oychart2_1.push(oychart2_1[oychart2_1.length - 1] + profit);
            top2value.push(topvalue);
        }
    };
    for (var k = data.top3.length - 1; k >= 0; k--) {
        var element = data.top3[k];
        var datePredict = element.DatePredict.substring(0, 10);
        if (!dayoffs.includes(datePredict)) {
            if (datePredict === dateNowStr) {
                isAdd = !isAdd;
            }
            var topvalue = '';
            oxchart3.push(datePredict);
            oxchart8.push(datePredict);
            var profit = 0;
            var lototruenumber = 0;
            element.LotoPredicts.forEach(function (loto) {
                topvalue += (loto.IsTrue ? '(' + loto.LotoValue + ')' : loto.LotoValue) + ' ';
                profit += (loto.IsTrue ? (99 * loto.QtyLoto - 27) * start_point : -27 * start_point);
                if (loto.IsTrue) {
                    lototruenumber++;
                }
            });
            oychart3.push(oychart3[oychart3.length - 1] + profit);

            //Chart x2 and x3
            profit = -3 * start_point_x2_x3 - 1 * start_point_x2_x3;
            if (lototruenumber == 2) {
                profit += 17 * start_point_x2_x3;
            } else if (lototruenumber == 3) {
                profit += 17 * start_point_x2_x3 * lototruenumber + 74 * start_point_x2_x3;
            }
            oychart8.push(oychart8[oychart8.length - 1] + profit);

            var dlable = datePredict.substring(0, datePredict.length - 2) + '01';
            //Check lable Exist
            var isExistLable = false;
            isExistLable = oxchart8_1.find(function (label) {
                if (label === dlable) return true;
            });
            if (!isExistLable) {
                oxchart8_1.push(dlable);
                oychart8_1.push(0);
            }
            else {
                oxchart8_1.find(function (el, index) {
                    if (el === dlable) {
                        oychart8_1[index] += profit;
                        return;
                    }
                });
            }

            top3value.push(topvalue);
        }
    };
    for (var k = data.top4.length - 1; k >= 0; k--) {
        var element = data.top4[k];
        var datePredict = element.DatePredict.substring(0, 10);
        if (!dayoffs.includes(datePredict)) {
            if (datePredict === dateNowStr) {
                isAdd = !isAdd;
            }
            var topvalue = '';
            oxchart4.push(datePredict);
            var profit = 0;
            element.LotoPredicts.forEach(function (loto) {
                topvalue += (loto.IsTrue ? '(' + loto.LotoValue + ')' : loto.LotoValue) + ' ';
                profit += (loto.IsTrue ? (99 * loto.QtyLoto - 27) * start_point : -27 * start_point);
            });
            oychart4.push(oychart4[oychart4.length - 1] + profit);
            top4value.push(topvalue);
        }
    };
    for (var k = data.top5.length - 1; k >= 0; k--) {
        var element = data.top5[k];
        var datePredict = element.DatePredict.substring(0, 10);
        if (!dayoffs.includes(datePredict)) {
            if (datePredict === dateNowStr) {
                isAdd = !isAdd;
            }
            var topvalue = '';
            oxchart5.push(datePredict);
            var profit = 0;
            element.LotoPredicts.forEach(function (loto) {
                topvalue += (loto.IsTrue ? '(' + loto.LotoValue + ')' : loto.LotoValue) + ' ';
                profit += (loto.IsTrue ? (99 * loto.QtyLoto - 27) * start_point : -27 * start_point);
            });
            oychart5.push(oychart5[oychart5.length - 1] + profit);
            top5value.push(topvalue);
        }
    };
    for (var k = data.top6.length - 1; k >= 0; k--) {
        var element = data.top6[k];
        var datePredict = element.DatePredict.substring(0, 10);
        if (!dayoffs.includes(datePredict)) {
            if (datePredict === dateNowStr) {
                isAdd = !isAdd;
            }
            var topvalue = '';
            oxchart6.push(datePredict);
            var profit = 0;
            element.LotoPredicts.forEach(function (loto) {
                topvalue += (loto.IsTrue ? '(' + loto.LotoValue + ')' : loto.LotoValue) + ' ';
                profit += (loto.IsTrue ? (99 * loto.QtyLoto - 27) * start_point : -27 * start_point);
            });
            oychart6.push(oychart6[oychart6.length - 1] + profit);
            top6value.push(topvalue);
        }
    };
    var index = 0;
    for (var k = data.top7.length - 1; k >= 0; k--) {
        var element = data.top7[k];
        var datePredict = element.DatePredict.substring(0, 10);
        if (!dayoffs.includes(datePredict)) {
            if (datePredict === dateNowStr) {
                isAdd = !isAdd;
            }
            var topvalue = '';
            oxchart7.push(datePredict);
            var profit = 0;
            element.LotoPredicts.forEach(function (loto) {
                topvalue += (loto.IsTrue ? '(' + loto.LotoValue + ')' : loto.LotoValue) + ' ';
                profit += (loto.IsTrue ? (99 * loto.QtyLoto - 27) * start_point : -27 * start_point);
            });
            oychart7.push(oychart7[oychart7.length - 1] + profit);
            top7value.push(topvalue);
            html = '<tr>\
                    <td class="text-center text-loterry">' + element.DatePredict.substring(0, 10) + '</td>\
                    <td class="text-center text-loterry">' + element.GoldPointPredict + '</td>\
                    <td class="text-center text-loterry ' + ((top1value[index]).includes('(') && (top1value[index]).includes(')') ? "text-true" : "text-fail") + '">' + top1value[index] + '</td>\
                    <td class="text-center text-loterry ' + ((top2value[index]).includes('(') && (top2value[index]).includes(')') ? "text-true" : "text-fail") + '">' + top2value[index] + '</td>\
                    <td class="text-center text-loterry ' + ((top3value[index]).includes('(') && (top3value[index]).includes(')') ? "text-true" : "text-fail") + '">' + top3value[index] + '</td>\
                    <td class="text-center text-loterry ' + ((top4value[index]).includes('(') && (top4value[index]).includes(')') ? "text-true" : "text-fail") + '">' + top4value[index] + '</td>\
                    <td class="text-center text-loterry ' + ((top5value[index]).includes('(') && (top5value[index]).includes(')') ? "text-true" : "text-fail") + '">' + top5value[index] + '</td>\
                    <td class="text-center text-loterry ' + ((top6value[index]).includes('(') && (top6value[index]).includes(')') ? "text-true" : "text-fail") + '">' + top6value[index] + '</td>\
                    <td class="text-center text-loterry ' + ((top7value[index]).includes('(') && (top7value[index]).includes(')') ? "text-true" : "text-fail") + '">' + top7value[index] + '</td>\
                    <td class="text-center text-loterry">' + element.TimePredict.substring(0, 16).replace('T', ' ') + '</td>\
                </tr>' + html;
            index++;
        }
    };

    table[0].innerHTML = html;

    var ctx1 = document.getElementById('myChart1');
    var ctx2 = document.getElementById('myChart2');
    var ctx2_1 = document.getElementById('myChart2_1');
    var ctx3 = document.getElementById('myChart3');
    var ctx4 = document.getElementById('myChart4');
    var ctx5 = document.getElementById('myChart5');
    var ctx6 = document.getElementById('myChart6');
    var ctx7 = document.getElementById('myChart7');
    var ctx8 = document.getElementById('myChart8');
    var ctx8_1 = document.getElementById('myChart8_1');


    var myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: oxchart1,
            datasets: [{
                label: '# of Votes',
                data: oychart1,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'start'
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

    var myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: oxchart2,
            datasets: [{
                label: '# of Votes',
                data: oychart2,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'start'
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

    var myChart2_1 = new Chart(ctx2_1, {
        type: 'bar',
        data: {
            labels: oxchart2_1,
            datasets: [{
                label: '# of Votes',
                data: oychart2_1,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'start'
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

    var myChart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: oxchart3,
            datasets: [{
                label: '# of Votes',
                data: oychart3,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'start'
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

    var myChart4 = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: oxchart4,
            datasets: [{
                label: '# of Votes',
                data: oychart4,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'start'
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

    var myChart5 = new Chart(ctx5, {
        type: 'bar',
        data: {
            labels: oxchart5,
            datasets: [{
                label: '# of Votes',
                data: oychart5,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'start'
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

    var myChart6 = new Chart(ctx6, {
        type: 'bar',
        data: {
            labels: oxchart6,
            datasets: [{
                label: '# of Votes',
                data: oychart6,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'start'
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

    var myChart7 = new Chart(ctx7, {
        type: 'bar',
        data: {
            labels: oxchart7,
            datasets: [{
                label: '# of Votes',
                data: oychart7,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'start'
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

    var myChart8 = new Chart(ctx8, {
        type: 'bar',
        data: {
            labels: oxchart8,
            datasets: [{
                label: '# of Votes',
                data: oychart8,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'start'
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

    var myChart8_1 = new Chart(ctx8_1, {
        type: 'bar',
        data: {
            labels: oxchart8_1,
            datasets: [{
                label: '# profit',
                data: oychart8_1,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'start'
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