var ctx1 = document.getElementById('myChart1');
var ctx2 = document.getElementById('myChart2');
var ctx3 = document.getElementById('myChart3');
var ctx4 = document.getElementById('myChart4');
var ctx5 = document.getElementById('myChart5');
var ctx6 = document.getElementById('myChart6');

var oxchart1 = ['start'];
var oychart1 = [40000];
var oxchart2 = ['start'];
var oychart2 = [2000];
var oxchart3 = ['start'];
var oychart3 = [5000];
var oxchart4 = ['start'];
var oychart4 = [0];
var oxchart5 = [];
var oychart5 = [];
var oxchart6 = [];
var oychart6 = [];

var globaldata = [];
var start_point = 10;
var start_point_3dl = [1, 1, 2, 4, 6, 9, 13];
var maxlostday = 3;
function mainstatics(data, indexlotos) {
    var numberdaywin = 0;
    var isoff = [false, false, false, false];
    for (var k = data.length - 1; k >= 0; k--) {
        var profitchart5 = 0;
        var profitchart6 = 0;
        var element = data[k];
        var date = element.DatePredict.substring(0, 10);

        oxchart1.push(date);
        oxchart2.push(date);
        oxchart3.push(date);
        oxchart4.push(date);

        var oychart1_value = oychart1[oychart1.length - 1];
        var oychart2_value = oychart2[oychart2.length - 1];
        var oychart3_value = oychart3[oychart3.length - 1];
        for (var j = 0; j < indexlotos.length; j++) {
            var indexloto = indexlotos[j];
            var loto = element.LotoPredicts[indexloto];
            oychart1_value += (loto.IsTrue ? (99 - 27) * start_point : -27 * start_point);
            oychart3_value += (loto.IsTrue ? (972 - 230) * start_point_3dl[0] : -230 * start_point_3dl[0]);
            profitchart5 += (loto.IsTrue ? (972 - 230) * start_point_3dl[0] : -230 * start_point_3dl[0]);
            var dayofmonth = parseInt(date.substring(date.length - 2, date.length));
            var mod = dayofmonth % maxlostday;
            if (dayofmonth < 31) {
                if (!isoff[j]) {
                    isoff[j] = loto.IsTrue;
                    switch (mod) {
                        case 1:
                            oychart2_value += (loto.IsTrue ? (972 - 230) * start_point_3dl[mod - 1] : -230 * start_point_3dl[mod - 1]);
                            profitchart6 += (loto.IsTrue ? (972 - 230) * start_point_3dl[mod - 1] : -230 * start_point_3dl[mod - 1]);
                            break;
                        case 2:
                            oychart2_value += (loto.IsTrue ? (972 - 230) * start_point_3dl[mod - 1] : -230 * start_point_3dl[mod - 1]);
                            profitchart6 += (loto.IsTrue ? (972 - 230) * start_point_3dl[mod - 1] : -230 * start_point_3dl[mod - 1]);
                            break;
                        case 3:
                            oychart2_value += (loto.IsTrue ? (972 - 230) * start_point_3dl[mod - 1] : -230 * start_point_3dl[mod - 1]);
                            profitchart6 += (loto.IsTrue ? (972 - 230) * start_point_3dl[mod - 1] : -230 * start_point_3dl[mod - 1]);
                            break;
                        case 4:
                            oychart2_value += (loto.IsTrue ? (972 - 230) * start_point_3dl[mod - 1] : -230 * start_point_3dl[mod - 1]);
                            profitchart6 += (loto.IsTrue ? (972 - 230) * start_point_3dl[mod - 1] : -230 * start_point_3dl[mod - 1]);
                            break;
                        case 5:
                            oychart2_value += (loto.IsTrue ? (972 - 230) * start_point_3dl[mod - 1] : -230 * start_point_3dl[mod - 1]);
                            profitchart6 += (loto.IsTrue ? (972 - 230) * start_point_3dl[mod - 1] : -230 * start_point_3dl[mod - 1]);
                            break;
                        case 6:
                            oychart2_value += (loto.IsTrue ? (972 - 230) * start_point_3dl[mod - 1] : -230 * start_point_3dl[mod - 1]);
                            profitchart6 += (loto.IsTrue ? (972 - 230) * start_point_3dl[mod - 1] : -230 * start_point_3dl[mod - 1]);
                            break;
                        case 0:
                            oychart2_value += (loto.IsTrue ? (972 - 230) * start_point_3dl[2] : -230 * start_point_3dl[2]);
                            profitchart6 += (loto.IsTrue ? (972 - 230) * start_point_3dl[start_point_3dl.length - 1] : -230 * start_point_3dl[start_point_3dl.length - 1]);
                            isoff[j] = false;
                            break;
                    }
                } else {
                    isoff[j] = !(mod === 0);
                }
            }
            else {
                isoff[j] = false;
            }
        }

        if (oychart3_value > oychart3[oychart3.length - 1]) {
            numberdaywin++;
        }
        oychart4.push(numberdaywin * 100 / (data.length - k));
        oychart1.push(oychart1_value);
        oychart2.push(oychart2_value);
        oychart3.push(oychart3_value);

        var dlable = date.substring(0, date.length - 2) + '01';
        //Check lable Exist
        var isExistLable = false;
        isExistLable = oxchart5.find(function (label) {
            if (label === dlable) return true;
        });

        if (!isExistLable) {
            oxchart5.push(dlable);
            oychart5.push(profitchart5);
            oxchart6.push(dlable);
            oychart6.push(profitchart6);
        }
        else {
            oxchart5.find(function (el, index) {
                if (el === dlable) {
                    oychart5[index] += profitchart5;
                    oychart6[index] += profitchart6;
                    return;
                }
            });
        }
    };

    var myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: oxchart1,
            datasets: [{
                label: '# investing',
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

    var myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: oxchart2,
            datasets: [{
                label: '# investing',
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

    var myChart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: oxchart3,
            datasets: [{
                label: '# investing',
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

    var myChart4 = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: oxchart4,
            datasets: [{
                label: '# investing',
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

    var myChart5 = new Chart(ctx5, {
        type: 'bar',
        data: {
            labels: oxchart5,
            datasets: [{
                label: '# investing',
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

    var myChart6 = new Chart(ctx6, {
        type: 'bar',
        data: {
            labels: oxchart6,
            datasets: [{
                label: '# investing',
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
    $('#percent').text((oychart4[oychart4.length - 1]).toString() + '%');
}

d3.json("https://raw.githubusercontent.com/bienhuynh/XSMBView/main/data/result_full_predict_09_2021.json", function (error, data) {
    if (error)
        throw error;
    globaldata = data;
    var colid1 = $('#colid1').val();
    var colid2 = $('#colid2').val();
    var colid3 = $('#colid3').val();
    var colid4 = $('#colid4').val();
    var colid5 = $('#colid5').val();
    var colid6 = $('#colid6').val();
    var colid7 = $('#colid7').val();
    var indexlotos = [];
    if (colid1 > 0) {
        indexlotos.push(colid1 - 1);
    }
    if (colid2 > 0) {
        indexlotos.push(colid2 - 1);
    }
    if (colid3 > 0) {
        indexlotos.push(colid3 - 1);
    }
    if (colid4 > 0) {
        indexlotos.push(colid4 - 1);
    }
    if (colid5 > 0) {
        indexlotos.push(colid5 - 1);
    }
    if (colid6 > 0) {
        indexlotos.push(colid6 - 1);
    }
    if (colid7 > 0) {
        indexlotos.push(colid7 - 1);
    }
    maxlostday = $('#maxlostday').val();
    mainstatics(data, indexlotos);
});



function colidOnchange() {
    oxchart1.splice(1, oxchart1.length);
    oychart1.splice(1, oychart1.length);
    oxchart1 = ['start'];
    oychart1 = [40000];
    oxchart2.splice(1, oxchart3.length);
    oychart2.splice(1, oychart3.length);
    oxchart2 = ['start'];
    oychart2 = [5000];
    oxchart3.splice(1, oxchart3.length);
    oychart3.splice(1, oychart3.length);
    oxchart3 = ['start'];
    oychart3 = [5000];
    oxchart4.splice(1, oxchart4.length);
    oychart4.splice(1, oychart4.length);
    oxchart4 = ['start'];
    oychart4 = [0];
    oxchart5.splice(1, oxchart5.length);
    oychart5.splice(1, oychart5.length);
    oxchart5 = ['start'];
    oychart5 = [];
    oxchart6.splice(1, oxchart6.length);
    oychart6.splice(1, oychart6.length);
    oxchart6 = ['start'];
    oychart6 = [];
    $('#myChart1').remove();
    $('#myChart2').remove();
    $('#myChart3').remove();
    $('#myChart4').remove();
    $('#myChart5').remove();
    $('#myChart6').remove();
    $('iframe.chartjs-hidden-iframe').remove();
    $('#ctx1').append('<canvas style="background-color:white;" id="myChart1" width="400" height="400"></canvas>');
    $('#ctx2').append('<canvas style="background-color:white;" id="myChart2" width="400" height="400"></canvas>');
    $('#ctx3').append('<canvas style="background-color:white;" id="myChart3" width="400" height="400"></canvas>');
    $('#ctx4').append('<canvas style="background-color:white;" id="myChart4" width="400" height="400"></canvas>');
    $('#ctx5').append('<canvas style="background-color:white;" id="myChart5" width="400" height="400"></canvas>');
    $('#ctx6').append('<canvas style="background-color:white;" id="myChart6" width="400" height="400"></canvas>');

    ctx1 = document.getElementById('myChart1');
    ctx2 = document.getElementById('myChart2');
    ctx3 = document.getElementById('myChart3');
    ctx4 = document.getElementById('myChart4');
    ctx5 = document.getElementById('myChart5');
    ctx6 = document.getElementById('myChart6');

    var colid1 = $('#colid1').val();
    var colid2 = $('#colid2').val();
    var colid3 = $('#colid3').val();
    var colid4 = $('#colid4').val();
    var colid5 = $('#colid5').val();
    var colid6 = $('#colid6').val();
    var colid7 = $('#colid7').val();
    var indexlotos = [];
    if (colid1 > 0) {
        indexlotos.push(colid1 - 1);
    }
    if (colid2 > 0) {
        indexlotos.push(colid2 - 1);
    }
    if (colid3 > 0) {
        indexlotos.push(colid3 - 1);
    }
    if (colid4 > 0) {
        indexlotos.push(colid4 - 1);
    }
    if (colid5 > 0) {
        indexlotos.push(colid5 - 1);
    }
    if (colid6 > 0) {
        indexlotos.push(colid6 - 1);
    }
    if (colid7 > 0) {
        indexlotos.push(colid7 - 1);
    }
    mainstatics(globaldata, indexlotos);
}

$('#colid1').on('change', function (e) {
    colidOnchange();
});
$('#colid2').on('change', function (e) {
    colidOnchange();
});
$('#colid3').on('change', function (e) {
    colidOnchange();
});
$('#colid4').on('change', function (e) {
    colidOnchange();
});
$('#colid5').on('change', function (e) {
    colidOnchange();
});
$('#colid6').on('change', function (e) {
    colidOnchange();
});
$('#colid7').on('change', function (e) {
    colidOnchange();
});
$('#maxlostday').on('change', function (e) {
    maxlostday = $('#maxlostday').val();
    colidOnchange();
});


//Export CSV function 
function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString().replace(',', '');
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
$('#ctx3-export').on('click', function (e) {
    var date0 = new Date(oxchart3[1]);
    var date1 = new Date(date0.setDate(date0.getDate() - 1));
    var rows = [
        ['Date', 'Revenue'],
        [date1, oychart3[0]]
    ];

    for (var i = 1; i < oxchart3.length; i++) {
        var row = [new Date(oxchart3[i]), oychart3[i]];
        rows.push(row);
    }
    exportToCsv('data.csv', rows);
});
