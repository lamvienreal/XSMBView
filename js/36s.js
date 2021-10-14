var ctx1 = document.getElementById('myChart1');
var ctx2 = document.getElementById('myChart2');
var ctx3 = document.getElementById('myChart3');
var ctx4 = document.getElementById('myChart4');
var ctx5 = document.getElementById('myChart5');
var ctx6 = document.getElementById('myChart6');
var ctx7 = document.getElementById('myChart7');
var ctx8 = document.getElementById('myChart8');
var ctx9 = document.getElementById('myChart9');
var ctx10 = document.getElementById('myChart10');
var ctx11 = document.getElementById('myChart11');
var ctx12 = document.getElementById('myChart12');

var oxchart1 = ['start'],
    oychart1 = [5000];
var oxchart2 = ['start'],
    oychart2 = [2000];
var oxchart3 = ['start'],
    oychart3 = [5000];
var oxchart4 = ['start'],
    oychart4 = [5000];
var oxchart5 = ['start'],
    oychart5 = [2000];
var oxchart6 = ['start'],
    oychart6 = [5000];
var oxchart7 = ['start'],
    oychart7 = [5000];
var oxchart8 = ['start'],
    oychart8 = [5000];
var oxchart9 = ['start'],
    oychart9 = [5000];
var oxchart10 = ['start'],
    oychart10 = [5000];
var oxchart11 = ['start'],
    oychart11 = [5000];
var oxchart12 = ['start'],
    oychart12 = [5000];

var start_point = 1;
var start_point_by_profit_g00 = 1;
var start_point_by_profit_g11 = 1;
var _3ds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var dayoffs = ['2020-01-24', '2020-01-25', '2020-01-26', '2020-01-27', '2020-04-01', '2020-04-02', '2020-04-03', '2020-04-04', '2020-04-05', '2020-04-06', '2020-04-07', '2020-04-08', '2020-04-09', '2020-04-10',
    '2020-04-11', '2020-04-12', '2020-04-13', '2020-04-14', '2020-04-15', '2020-04-16', '2020-04-17', '2020-04-18', '2020-04-19', '2020-04-20'
    , '2020-04-21', '2020-04-22', '2020-04-23'];
$('#_64s_str').text("Dàn số");
var _64s = [12, 14, 15, 17, 19, 21, 23, 24, 25, 26, 27, 28, 29, 31, 32, 34, 35, 36, 37, 38, 39, 41, 42, 43, 45, 46, 47, 48, 49, 51, 52, 53, 54, 56, 57, 58, 59, 61, 62, 63, 64, 65, 67, 68, 69, 71, 72, 73, 74, 75, 76, 78, 79, 81, 82, 83, 84, 85, 87, 89, 92, 93, 94, 95, 97];
var _36s = [];

d3.json("https://raw.githubusercontent.com/bienhuynh/XSMBView/main/data/resultlotterytable_09_2021.json", function (error, data) {
    if (error)
        throw error;
    //var _64s = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10,
    //    11, 12, 13, 14, 16, 20, 21, 22, 23, 27, 29,
    //    30, 31, 32, 33, 35, 36, 37, 38, 40, 41,
    //    44, 45, 46, 47, 50, 53, 54, 55, 56, 59,
    //    60, 61, 63, 64, 65, 66, 67, 68, 70, 73,
    //    74, 76, 77, 79, 80, 83, 86, 88, 89, 90,
    //    92, 95, 98];
    
    for (var i = 0; i < 100; i++) {
        if (!_64s.includes(i)) {
            _36s.push(i < 10 ? '0' + i : i);
        }
    }

    $('#_64s_value').val(_36s);
    var _64s_str = '[01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 16, 20, 21, 23, 27, 29, 30, 31, 32, 33, 35, 36, 37, 38, 40, 41, 44, 45, 46, 47, 50, 53, 54, 55, 56, 59, 60, 61, 63, 64, 65, 66, 67, 68, 70, 73, 74, 76, 77, 79, 80, 83, 86, 88, 89, 90, 92, 95, 98]';
    
    var table = $('.itable>tbody');
    table[0].innerHTML = '';
    var html = '';
    //Find Datelottery
    var datelotterys = [];
    data.forEach(function (element, index) {
        if (!datelotterys.includes(element.DateLottery) && !dayoffs.includes(element.DateLottery)) {
            datelotterys.push(element.DateLottery);
        }
    });

    var _5day = 0;
    oychart6.push(oychart6[oychart6.length - 1]);
    oychart7.push(oychart7[oychart7.length - 1]);
    for (var iday = datelotterys.length - 1; iday >= 0; iday--) {
        _5day += 1;
        var date = datelotterys[iday];
        var resultlotterybydate = [];
        data.find(function (element) {
            if (element.DateLottery === date) {
                resultlotterybydate.push(element);
            }
        });
        var rl_html = '<tr>';
        rl_html += '<td class="text-center text-loterry">' + date + '</td>';
        oxchart1.push(date);
        oxchart2.push(date);
        oxchart3.push(date);
        oxchart4.push(date);
        oxchart5.push(date);
        oxchart10.push(date);
        if (_5day % 5 === 0 || iday == 0) {
            oxchart6.push(date);
            oxchart7.push(date);
            oxchart8.push(date);
            oxchart9.push(date);
            oxchart11.push(date);
            oxchart12.push(date);
            profit_g00_3d_5days = 0;
            profit_g11_3d_5days = 0;
            oychart6.push(oychart6[oychart6.length - 1]);
            oychart7.push(oychart7[oychart7.length - 1]);
            oychart8.push(oychart8[oychart8.length - 1]);
            oychart9.push(oychart9[oychart9.length - 1]);
            oychart11.push(oychart11[oychart11.length - 1]);
            oychart12.push(oychart12[oychart12.length - 1]);
            _5day = 0;
            var a = Math.floor(oychart8[oychart8.length - 1] / (oychart6[0] * 2));
            var b = Math.floor(oychart9[oychart9.length - 1] / (oychart7[0] * 2));
            start_point_by_profit_g00 = a > 1 ? a <= 300 ? a : 300 : 1;
            start_point_by_profit_g11 = b > 1 ? b <= 300 ? b : 300 : 1;
        }
        var profit_g00_36s = 0, profit_g11_36s = 0;
        var profit_g00_3d_5days = 0, profit_g11_3d_5days = 0;
        resultlotterybydate.forEach(function (element, index) {
            if (element.NameLottery === "G00") {
                var g00_2 = element.Value.substring(element.Value.length - 2, element.Value.length);
                rl_html += '<td class="text-center text-loterry ' + (!_64s.includes(parseInt(g00_2)) ? "text-true" : "text-fail") + '">' + g00_2 + '</td>';
                rl_html += '<td data-g00="' + element.Value + '" class="text-center text-loterry 3d-g00 '
                    + (!_64s.includes(parseInt(g00_2)) && _3ds.includes(parseInt(element.Value[2])) ? "text-true" : "text-fail") + '">' + _3ds + '</td>';
                profit_g00_36s = (!_64s.includes(parseInt(g00_2)) ? (99 - _36s.length) * start_point : -1 * _36s.length * start_point);
                oychart1.push(oychart1[oychart1.length - 1] + profit_g00_36s);
                profit_g00_3d_5days += (!_64s.includes(parseInt(g00_2)) && _3ds.includes(parseInt(element.Value[2])) ? (972.5 - _36s.length * _3ds.length) * start_point : -1 * _36s.length * _3ds.length * start_point);
                oychart3.push(oychart3[oychart3.length - 1] + profit_g00_3d_5days);
            }

            if (element.NameLottery === "G11") {
                var g11_2 = element.Value.substring(element.Value.length - 2, element.Value.length);
                rl_html += '<td class="text-center text-loterry ' + (!_64s.includes(parseInt(g11_2)) ? "text-true" : "text-fail") + '">' + g11_2 + '</td>';
                rl_html += '<td data-g11="' + element.Value + '" class="text-center text-loterry 3d-g11 '
                    + (!_64s.includes(parseInt(g11_2)) && _3ds.includes(parseInt(element.Value[2])) ? "text-true" : "text-fail") + '">' + _3ds + '</td>';
                profit_g11_36s = (!_64s.includes(parseInt(g11_2)) ? (99 - _36s.length) * start_point : -1 * _36s.length * start_point);
                oychart2.push(oychart2[oychart2.length - 1] + profit_g11_36s);
                profit_g11_3d_5days += (!_64s.includes(parseInt(g11_2)) && _3ds.includes(parseInt(element.Value[2])) ? (972.5 - _36s.length * _3ds.length) * start_point : -1 * _36s.length * _3ds.length * start_point);
                oychart4.push(oychart4[oychart4.length - 1] + profit_g11_3d_5days);
            }
        });

        oychart5.push(oychart5[oychart5.length - 1] + profit_g00_36s + profit_g11_36s);
        oychart10.push(oychart10[oychart10.length - 1] + profit_g00_3d_5days + profit_g11_3d_5days);
        
        oychart6[oychart6.length - 1] += profit_g00_3d_5days;
        oychart7[oychart7.length - 1] += profit_g11_3d_5days;
        oychart8[oychart8.length - 1] += profit_g00_3d_5days * start_point_by_profit_g00;
        oychart9[oychart9.length - 1] += profit_g11_3d_5days * start_point_by_profit_g11;
        oychart11[oychart11.length - 1] += profit_g00_3d_5days + profit_g11_3d_5days;
        oychart12[oychart12.length - 1] += profit_g00_3d_5days * start_point_by_profit_g00 + profit_g11_3d_5days * start_point_by_profit_g11;
        rl_html += '</tr>';
        html = rl_html + html;
    };
    table[0].innerHTML = html;


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

    //chart
    var myChart4 = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: oxchart4,
            datasets: [{
                label: '# profit',
                data: oychart4,
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
    var myChart5 = new Chart(ctx5, {
        type: 'bar',
        data: {
            labels: oxchart5,
            datasets: [{
                label: '# profit',
                data: oychart5,
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
    var myChart6 = new Chart(ctx6, {
        type: 'bar',
        data: {
            labels: oxchart6,
            datasets: [{
                label: '# profit',
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
            labels: oxchart7,
            datasets: [{
                label: '# profit',
                data: oychart7,
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
    var myChart8 = new Chart(ctx8, {
        type: 'bar',
        data: {
            labels: oxchart8,
            datasets: [{
                label: '# profit',
                data: oychart8,
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
    var myChart9 = new Chart(ctx9, {
        type: 'bar',
        data: {
            labels: oxchart9,
            datasets: [{
                label: '# profit',
                data: oychart9,
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
    var myChart10 = new Chart(ctx10, {
        type: 'bar',
        data: {
            labels: oxchart10,
            datasets: [{
                label: '# profit',
                data: oychart10,
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
    var myChart11 = new Chart(ctx11, {
        type: 'bar',
        data: {
            labels: oxchart11,
            datasets: [{
                label: '# profit',
                data: oychart11,
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
    var myChart12 = new Chart(ctx12, {
        type: 'bar',
        data: {
            labels: oxchart12,
            datasets: [{
                label: '# profit',
                data: oychart12,
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
});

$(document).on('click', '.3d-g00', function () {
    console.log($(this).attr('data-g00'));
    var result = [];
    _36s.forEach(function (s, idx1) {
        _3ds.forEach(function (c, idx2) {
            result.push(c.toString() + s.toString());
        });
    });
    $('#_3d36s_value').val(result);
});


$(document).on('click', '.3d-g11', function () {
    var g11 = $(this).attr('data-g11');
    console.log($(this).attr('data-g11'));
    var result = [];
    _36s.forEach(function (s, idx1) {
        _3ds.forEach(function (c, idx2) {
            result.push(c.toString() + s.toString());
        });
    });
    $('#_3d36s_value').val(result);
});