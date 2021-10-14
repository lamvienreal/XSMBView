var ctx1 = document.getElementById('myChart1');
var ctx2 = document.getElementById('myChart2');
var ctx3 = document.getElementById('myChart3');
var ctx4 = document.getElementById('myChart4');
var ctx5 = document.getElementById('myChart5');
var ctx6 = document.getElementById('myChart6');
var ctx7 = document.getElementById('myChart7');
var ctx8 = document.getElementById('myChart8');
var ctx9 = document.getElementById('myChart9');

var oxchart1 = ['start'],
    oychart1 = [5000];
var oxchart2 = ['start'],
    oychart2 = [5000];
var oxchart3 = ['start'],
    oychart3 = [5000];
var oxchart4 = ['start'],
    oychart4 = [5000];
var oxchart5 = ['start'],
    oychart5 = [10000];
var oxchart6 = ['start'],
    oychart6 = [5000];
var oxchart7 = ['start'],
    oychart7 = [5000];
var oxchart8 = ['start'],
    oychart8 = [5000];
var oxchart9 = ['start'],
    oychart9 = [5000];

var _3ds = [0, 2, 3, 4, 5, 6, 7, 8];
var start_point = 1;
var start_point_by_profit_g00 = 1;
var start_point_by_profit_g11 = 1;
function formatDate(d) {
    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function getc4(c4) {

    var _64stmp = [];
    for (var l = 0; l < 10; l++) {
        c4.forEach(function (c, index) {
            var p1 = c.toString() + l.toString();
            var p2 = l.toString() + c.toString();

            if (!_64stmp.includes(p1)) {
                _64stmp.push(p1);
            }

            if (!_64stmp.includes(p2)) {
                _64stmp.push(p2);
            }
        });
    }
    return _64stmp;
}

function get64s(data, date) {
    var result = [];
    var c4 = [];
    var _64stmp = [];
    var resultlotterybydate = [];
    data.find(function (element) {
        if (element.DateLottery === date) {
            resultlotterybydate.push(element);
        }
    });

    resultlotterybydate.forEach(function (element, index) {
        if (element.NameLottery === "G00") {
            var a5 = parseInt(element.Value.substring(0, 1));
            for (var k = 0; k <= 3; k++) {
                var a0 = a5 + k;
                if (a0 > 9) {
                    c4.push(a0 % 10);
                }
                else {
                    c4.push(a5 + k);
                }
            }
            _64stmp = getc4(c4);
        }
    });
    result.push(_64stmp);
    result.push(c4);
    return result;
}

d3.json("https://raw.githubusercontent.com/bienhuynh/XSMBView/main/data/resultlotterytable_09_2021.json", function (error, data) {
    if (error)
        throw error;
    var _64s = [];
    var investday = -64 * start_point;
    var winday = 99 * start_point;
    var table = $('.itable>tbody');

    table[0].innerHTML = '';
    var html = '';
    //Find Datelottery
    var datelotterys = [];
    data.forEach(function (element, index) {
        if (!datelotterys.includes(element.DateLottery)) {
            datelotterys.push(element.DateLottery);
        }
    });
    var _5day = 0;
    oychart6.push(oychart6[oychart6.length - 1]);
    oychart7.push(oychart7[oychart7.length - 1]);
    for (var iday = datelotterys.length - 1 - 32 - 2000; iday >= 0; iday--) {
        _5day += 1;
        var date = datelotterys[iday];
        var datebefore = new Date(date);
        datebefore.setDate(datebefore.getDate() - 1);
        datebefore.setMonth(datebefore.getMonth() - 1);
        var d = formatDate(datebefore);
        _64s = get64s(data, d);
        oxchart1.push(date);
        oxchart2.push(date);
        oxchart3.push(date);
        oxchart4.push(date);
        oxchart5.push(date);
        var resultlotterybydate = [];
        data.find(function (element) {
            if (element.DateLottery === date) {
                resultlotterybydate.push(element);
            }
        });
        if (_5day % 5 === 0 || iday == 0) {
            oxchart6.push(date);
            oxchart7.push(date);
            oxchart8.push(date);
            oxchart9.push(date);
            profit_g00_3d_5days = 0;
            profit_g11_3d_5days = 0;
            oychart6.push(oychart6[oychart6.length - 1]);
            oychart7.push(oychart7[oychart7.length - 1]);
            oychart8.push(oychart8[oychart8.length - 1]);
            oychart9.push(oychart9[oychart9.length - 1]);
            _5day = 0;
            var a = Math.floor(oychart8[oychart8.length - 1] / (oychart6[0] * 2));
            var b = Math.floor(oychart9[oychart9.length - 1] / (oychart7[0] * 2));
            start_point_by_profit_g00 = a > 1 ? a <= 300 ? a : 300 : 1;
            start_point_by_profit_g11 = b > 1 ? b <= 300 ? b : 300 : 1;
        }
        var profit_g00_64s = 0, profit_g11_36s = 0;
        var profit_g00_3d_5days = 0, profit_g11_3d_5days = 0;
        var rl_html = '<tr>';
        rl_html += '<td class="text-center text-loterry">' + date + '</td>';
        rl_html += '<td class="text-center text-loterry number_c4" data-c4="' + _64s[1] + '" >' + _64s[1] + '</td>';
        resultlotterybydate.forEach(function (element, index) {
            if (element.NameLottery === "G00") {
                var g00_2 = element.Value.substring(element.Value.length - 2, element.Value.length);
                rl_html += '<td class="text-center text-loterry ' + (_64s[0].includes(g00_2) ? "text-true" : "text-fail") + '">' + element.Value + '</td>';
                rl_html += '<td data-g00="' + element.Value + '" data-c4="' + _64s[1] + '" class="text-center text-loterry 3d-g00 '
                    + (_64s[0].includes(g00_2) && _3ds.includes(parseInt(element.Value[2])) ? "text-true" : "text-fail") + '">' + _3ds + '</td>';
                
                profit_g00_64s = (_64s[0].includes(g00_2) ? investday + winday : investday);
                oychart1.push(oychart1[oychart1.length - 1] + profit_g00_64s);
                profit_g00_3d_5days += (_64s[0].includes(g00_2) ? (972.5 - _64s[0].length * _3ds.length) * start_point : -1 * _64s[0].length * _3ds.length * start_point);
                oychart3.push(oychart3[oychart3.length - 1] + profit_g00_3d_5days);
            }

            if (element.NameLottery === "G11") {
                var g11_2 = element.Value.substring(element.Value.length - 2, element.Value.length);
                rl_html += '<td class="text-center text-loterry ' + (_64s[0].includes(g11_2) ? "text-true" : "text-fail") + '">' + element.Value + '</td>';
                rl_html += '<td data-g11="' + element.Value + '" data-c4="' + _64s[1] + '" class="text-center text-loterry 3d-g11 '
                    + (_64s[0].includes(g11_2) && _3ds.includes(parseInt(element.Value[2])) ? "text-true" : "text-fail") + '">' + _3ds + '</td>';
                
                profit_g11_36s = (_64s[0].includes(g11_2) ? investday + winday : investday);
                oychart2.push(oychart2[oychart2.length - 1] + profit_g11_36s);
                profit_g11_3d_5days += (_64s[0].includes(g11_2) ? (972.5 - _64s[0].length * _3ds.length) * start_point : -1 * _64s[0].length * _3ds.length * start_point);
                oychart4.push(oychart4[oychart4.length - 1] + profit_g11_3d_5days);
            }
        });
        oychart5.push(oychart5[oychart5.length - 1] + profit_g00_64s + profit_g11_36s);
        oychart6[oychart6.length - 1] += profit_g00_3d_5days;
        oychart7[oychart7.length - 1] += profit_g11_3d_5days;
        oychart8[oychart8.length - 1] += profit_g00_3d_5days * start_point_by_profit_g00;
        oychart9[oychart9.length - 1] += profit_g11_3d_5days * start_point_by_profit_g11;

        rl_html += '</tr>';
        _64s = [];
        html = rl_html + html;
    };
    var date = datelotterys[0];
    var datebefore = new Date(date);
    datebefore.setMonth(datebefore.getMonth() - 1);
    var d = formatDate(datebefore);
    _64s = get64s(data, d);
    datebefore.setMonth(datebefore.getMonth() + 1);
    datebefore.setDate(datebefore.getDate() + 1)
    var rl_html = '<tr>';
    rl_html += '<td class="text-center text-loterry">' + formatDate(datebefore) + '</td>';
    rl_html += '<td class="text-center text-loterry number_c4" data-c4="' + _64s[1] + '">' + _64s[1] + '</td>';
    rl_html += '<td class="text-center text-loterry">Chờ kết quả</td>';
    rl_html += '<td class="text-center text-loterry 3d-g00 " data-c4="' + _64s[1] + '">' + _3ds + '</td>';
    rl_html += '<td class="text-center text-loterry">Chờ kết quả</td>';
    rl_html += '<td class="text-center text-loterry 3d-g11 " data-c4="' + _64s[1] + '">' + _3ds + '</td>';
    
    rl_html += '</tr>';
    _64s = [];
    html = rl_html + html;
    table[0].innerHTML = html;

    //paint chart
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
});


$(document).on('click', '.number_c4', function () {
    console.log($(this).attr('data-g00'));
    var result = [];
    var strtmp = $(this).attr('data-c4').split(",");
    var c4 = [strtmp[0], strtmp[1], strtmp[2], strtmp[3]];
    var _64s = getc4(c4);

    $('#_64s_value').val(_64s);
});


$(document).on('click', '.3d-g00', function () {
    console.log($(this).attr('data-g00'));
    var result = [];
    var strtmp = $(this).attr('data-c4').split(",");
    var c4 = [strtmp[0], strtmp[1], strtmp[2], strtmp[3]];
    var _64s = getc4(c4);
    _64s.forEach(function (s, idx1) {
        _3ds.forEach(function (c, idx2) {
            result.push(c.toString() + s.toString());
        });
    });
    $('#_3d64s_value').val(result);
});


$(document).on('click', '.3d-g11', function () {
    var g11 = $(this).attr('data-g11');
    console.log($(this).attr('data-g11'));
    var result = [];
    var strtmp = $(this).attr('data-c4').split(",");
    var c4 = [strtmp[0], strtmp[1], strtmp[2], strtmp[3]];
    var _64s = getc4(c4);
    _64s.forEach(function (s, idx1) {
        _3ds.forEach(function (c, idx2) {
            result.push(c.toString() + s.toString());
        });
    });
    $('#_3d64s_value').val(result);
});

