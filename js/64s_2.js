var c4_global = [0, 2, 3, 8];
var d4_global = [0, 2, 3, 8];
var data_global = [];
var ctx0 = document.getElementById('myChart0');
var ctx1 = document.getElementById('myChart1');
var ctx2 = document.getElementById('myChart2');
var ctx2_1 = document.getElementById('myChart2_1');
var ctx3 = document.getElementById('myChart3');
var ctx4 = document.getElementById('myChart4');
var ctx5 = document.getElementById('myChart5');
var ctx6 = document.getElementById('myChart6');
var ctx7 = document.getElementById('myChart7');
var ctx8 = document.getElementById('myChart8');
var ctx9 = document.getElementById('myChart9');
//chart
var oxchart0 = [0],
    oychart0 = [0];
var oxchart1 = ['start'],
    oychart1 = [1500];
var oxchart2 = [0],
    oychart2 = [0];
var oxchart2_1 = [1500],
    oychart2_1 = [1500];
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

function get64s(c4) {
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
    return [_64stmp, c4];
}

function removechartAll() {
    //chart
    oxchart0 = ['start'],
        oychart0 = [1500];
    oxchart1 = ['start'],
        oychart1 = [1500];
    oxchart2 = [],
        oychart2 = [];
    oxchart3 = ['start'],
        oychart3 = [5000];
    oxchart4 = ['start'],
        oychart4 = [5000];
    oxchart5 = ['start'],
        oychart5 = [10000];
    oxchart6 = ['start'],
        oychart6 = [5000];
    oxchart7 = ['start'],
        oychart7 = [5000];
    oxchart8 = ['start'],
        oychart8 = [5000];
    oxchart9 = ['start'],
        oychart9 = [5000];

    $('#myChart1').remove();
    $('#myChart2').remove();
    $('#myChart3').remove();
    $('#myChart4').remove();
    $('#myChart5').remove();
    $('#myChart6').remove();
    $('#myChart7').remove();
    $('#myChart8').remove();
    $('#myChart9').remove();
    $('iframe.chartjs-hidden-iframe').remove();
    $('#ctx1').append('<canvas style="background-color:white;" id="myChart1" width="400" height="400"></canvas>');
    $('#ctx2').append('<canvas style="background-color:white;" id="myChart2" width="400" height="400"></canvas>');
    $('#ctx3').append('<canvas style="background-color:white;" id="myChart3" width="400" height="400"></canvas>');
    $('#ctx4').append('<canvas style="background-color:white;" id="myChart4" width="400" height="400"></canvas>');
    $('#ctx5').append('<canvas style="background-color:white;" id="myChart5" width="400" height="400"></canvas>');
    $('#ctx6').append('<canvas style="background-color:white;" id="myChart6" width="400" height="400"></canvas>');
    $('#ctx7').append('<canvas style="background-color:white;" id="myChart7" width="400" height="400"></canvas>');
    $('#ctx8').append('<canvas style="background-color:white;" id="myChart8" width="400" height="400"></canvas>');
    $('#ctx9').append('<canvas style="background-color:white;" id="myChart9" width="400" height="400"></canvas>');

    ctx0 = document.getElementById('myChart0');
    ctx1 = document.getElementById('myChart1');
    ctx2 = document.getElementById('myChart2');
    ctx3 = document.getElementById('myChart3');
    ctx4 = document.getElementById('myChart4');
    ctx5 = document.getElementById('myChart5');
    ctx6 = document.getElementById('myChart6');
    ctx7 = document.getElementById('myChart7');
    ctx8 = document.getElementById('myChart8');
    ctx9 = document.getElementById('myChart9');
}

function staticsdata(data) {
    var _64s = [];
    var _64s_g1 = [];
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
    var numberdaywing00 = 0;
    var numberdaywing11 = 0;
    for (var iday = datelotterys.length - 1; iday >= 0; iday--) {
        _5day += 1;
        var date = datelotterys[iday];
        oxchart0.push(date);
        oxchart1.push(date);
        oxchart2.push(date);
        oxchart2_1.push(date);
        oxchart3.push(date);
        oxchart4.push(date);
        oxchart5.push(date);
        var resultlotterybydate = [];
        data.find(function (element) {
            if (element.DateLottery === date) {
                resultlotterybydate.push(element);
            }
        });

        _64s = get64s(c4_global);
        _64s_g1 = get64s(d4_global);
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
        resultlotterybydate.forEach(function (element, index) {
            if (element.NameLottery === "G00") {
                var g00_2 = element.Value.substring(element.Value.length - 2, element.Value.length);
                rl_html += '<td class="text-center text-loterry ' + (_64s[0].includes(g00_2) ? "text-true" : "text-fail") + '">' + element.Value + '</td>';
                rl_html += '<td class="text-center text-loterry number_c4 '
                    + (_64s[0].includes(g00_2) ? "text-true" : "text-fail") + '" data-c4="' + _64s[1] + '">' + _64s[1] + '</td>'

                rl_html += '<td data-g00="' + element.Value + '" data-c4="' + _64s[1] + '" class="text-center text-loterry 3d-g00 '
                    + (_64s[0].includes(g00_2) && _3ds.includes(parseInt(element.Value[2])) ? "text-true" : "text-fail") + '">' + _3ds + '</td>';
                
                numberdaywing00 += _64s[0].includes(g00_2) ? 1 : 0;
                
                oychart0.push(numberdaywing00 / (datelotterys.length - iday));
                oychart1.push(oychart1[oychart1.length - 1] + (_64s[0].includes(g00_2) ? investday + winday : investday));
                profit_g00_64s = (_64s[0].includes(g00_2) ? investday + winday : investday);
                profit_g00_3d_5days += (_64s[0].includes(g00_2) && _3ds.includes(parseInt(element.Value[2])) ? (972.5 - _64s[0].length * _3ds.length) * start_point : -1 * _64s[0].length * _3ds.length * start_point);
                oychart3.push(oychart3[oychart3.length - 1] + profit_g00_3d_5days);
            }
            if (element.NameLottery === "G11") {
                var g11_2 = element.Value.substring(element.Value.length - 2, element.Value.length);
                rl_html += '<td class="text-center text-loterry ' + (_64s_g1[0].includes(g11_2) ? "text-true" : "text-fail") + '">' + element.Value + '</td>'
                rl_html += '<td class="text-center text-loterry number_c4 '
                    + (_64s_g1[0].includes(g11_2) ? "text-true" : "text-fail") + '" data-c4="' + _64s[1] + '">' + _64s_g1[1] + '</td>';
                rl_html += '<td data-g11="' + element.Value + '" data-c4="' + _64s_g1[1] + '" class="text-center text-loterry 3d-g11 '
                    + (_64s_g1[0].includes(g11_2) && _3ds.includes(parseInt(element.Value[2])) ? "text-true" : "text-fail") + '">' + _3ds + '</td>';
                numberdaywing11 += _64s_g1[0].includes(g11_2) ? 1 : 0;
                oychart2.push(numberdaywing11 / (datelotterys.length - iday));
                oychart2_1.push(oychart2_1[oychart2_1.length - 1] + (_64s_g1[0].includes(g11_2) ? investday + winday : investday));
                profit_g11_36s = (_64s_g1[0].includes(g11_2) ? investday + winday : investday);
                profit_g11_3d_5days += (_64s_g1[0].includes(g11_2) && _3ds.includes(parseInt(element.Value[2])) ? (972.5 - _64s_g1[0].length * _3ds.length) * start_point : -1 * _64s_g1[0].length * _3ds.length * start_point);
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
        _64s_g1 = [];
        html = rl_html + html;
    };
    var date = datelotterys[0];
    var datebefore = new Date(date);
    datebefore.setMonth(datebefore.getMonth() - 1);
    var d = formatDate(datebefore);
    _64s = get64s(c4_global);
    _64s_g1 = get64s(c4_global);
    datebefore.setMonth(datebefore.getMonth() + 1);
    datebefore.setDate(datebefore.getDate() + 1)
    var rl_html = '<tr>';
    rl_html += '<td class="text-center text-loterry">' + formatDate(datebefore) + '</td>';
    rl_html += '<td class="text-center text-loterry">Chờ kết quả</td>';
    rl_html += '<td class="text-center text-loterry number_c4" data-c4="' + _64s[1] + '">' + _64s[1] + '</td>';
    rl_html += '<td class="text-center text-loterry">' + _3ds + '</td>';
    rl_html += '<td class="text-center text-loterry">Chờ kết quả</td>';
    rl_html += '<td class="text-center text-loterry number_c4" data-c4="' + _64s[1] + '">' + _64s_g1[1] + '</td>';
    rl_html += '<td class="text-center text-loterry">' + _3ds + '</td>';
    rl_html += '</tr>';
    _64s = [];
    html = rl_html + html;
    table[0].innerHTML = html;

    //paint chart
    //chart
    var myChart0 = new Chart(ctx0, {
        type: 'bar',
        data: {
            labels: oxchart0,
            datasets: [{
                label: '# profit',
                data: oychart0,
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
    var myChart2_1 = new Chart(ctx2_1, {
        type: 'bar',
        data: {
            labels: oxchart2_1,
            datasets: [{
                label: '# profit',
                data: oychart2_1,
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
}

d3.json("https://raw.githubusercontent.com/bienhuynh/XSMBView/main/data/resultlotterytable_09_2021.json", function (error, data) {
    if (error)
        throw error;
    data_global = data;
    $('#64s_c1').val(c4_global[0]);
    $('#64s_c2').val(c4_global[1]);
    $('#64s_c3').val(c4_global[2]);
    $('#64s_c4').val(c4_global[3]);

    $('#64s_d1').val(d4_global[0]);
    $('#64s_d2').val(d4_global[1]);
    $('#64s_d3').val(d4_global[2]);
    $('#64s_d4').val(d4_global[3]);
    staticsdata(data);
});

$('#64s_c1').on('change', function () {
    c4_global[0] = $(this).val();
    console.log(c4_global[0]);
    removechartAll();
    staticsdata(data_global);
});
$('#64s_c2').on('change', function () {
    c4_global[1] = $(this).val();
    console.log(c4_global[1]);
    removechartAll();
    staticsdata(data_global);
});
$('#64s_c3').on('change', function () {
    c4_global[2] = $(this).val();
    console.log(c4_global[2]);
    removechartAll();
    staticsdata(data_global);
});
$('#64s_c4').on('change', function () {
    c4_global[3] = $(this).val();
    console.log(c4_global[3]);
    removechartAll();
    staticsdata(data_global);
});


$('#64s_d1').on('change', function () {
    d4_global[0] = $(this).val();
    removechartAll();
    staticsdata(data_global);
});
$('#64s_d2').on('change', function () {
    d4_global[1] = $(this).val();
    removechartAll();
    staticsdata(data_global);
});
$('#64s_d3').on('change', function () {
    d4_global[2] = $(this).val
    removechartAll();
    staticsdata(data_global);
});
$('#64s_d4').on('change', function () {
    d4_global[3] = $(this).val();
    removechartAll();
    staticsdata(data_global);
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