var ctx1 = document.getElementById('myChart1');
var ctx2 = document.getElementById('myChart2');
var ctx3 = document.getElementById('myChart3');
var ctx4 = document.getElementById('myChart4');
var oxchart1 = ['start'];
var oychart1 = [40000];
var oxchart2 = ['start'];
var oychart2 = [2000];
var oxchart3 = ['start'];
var oychart3 = [5000];
var oxchart4 = ['start'];
var oychart4 = [0];

var globaldata = [];
var start_point = 10;
var start_point_3dl = [1, 2, 4, 6, 9];
var percentwin100lo = [];
function mainstatics(data, indexloto) {
    var numberdaywin = 0;
    var isoff = false;
    for (var k = data.length - 1; k >= 0; k--) {
        var element = data[k];
        var date = element.DatePredict.substring(0, 10);

        oxchart1.push(date);
        oxchart2.push(date);
        oxchart3.push(date);
        oxchart4.push(date);
        var loto = element.LotoPredicts[indexloto];
        oychart1.push(oychart1[oychart1.length - 1] + (loto.IsTrue ? (99 - 27) * start_point : -27 * start_point));
        oychart3.push(oychart3[oychart3.length - 1] + (loto.IsTrue ? (972 - 230) * start_point_3dl[0] : -230 * start_point_3dl[0]));
        if (loto.IsTrue) {
            numberdaywin++;
        }
        oychart4.push(numberdaywin * 100 / (data.length - k));

        var dayofmonth = parseInt(date.substring(date.length - 2, date.length));
        var mod = dayofmonth % 3;
        if (dayofmonth < 31) {
            if (!isoff) {
                isoff = loto.IsTrue;
                switch (mod) {
                    case 1:
                        oychart2.push(oychart2[oychart2.length - 1] + (loto.IsTrue ? (972 - 230) * start_point_3dl[mod - 1] : -230 * start_point_3dl[mod - 1]));
                        break;
                    case 2:
                        oychart2.push(oychart2[oychart2.length - 1] + (loto.IsTrue ? (972 - 230) * start_point_3dl[mod - 1] : -230 * start_point_3dl[mod - 1]));
                        break;
                    case 0:
                        oychart2.push(oychart2[oychart2.length - 1] + (loto.IsTrue ? (972 - 230) * start_point_3dl[2] : -230 * start_point_3dl[2]));
                        isoff = false;
                        break;
                }
            } else {
                isoff = !(mod === 0);
                oychart2.push(oychart2[oychart2.length - 1]);
            }
        }
        else {
            oychart2.push(oychart2[oychart2.length - 1]);
            isoff = false;
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
    $('#percent').text((oychart4[oychart4.length - 1]).toString() + '%');
}

function calulatepercentwin(data) {
    
    for (var i = 0; i < 100; i++) {
        percentwin100lo.push({
            Lx: i + 1,
            percent : 0
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
}

d3.json("https://raw.githubusercontent.com/bienhuynh/XSMBView/main/data/result_full_predict_08_2021.json", function (error, data) {
    if (error)
        throw error;
    globaldata = data;
    var indexloto = $('#colid').val();
    mainstatics(data, indexloto - 1);
    calulatepercentwin(data);
    for (var p = 0; p < 100; p++) {
        console.log('L' + percentwin100lo[p].Lx + ': ' + percentwin100lo[p].percent);
    }
});

$('#colid').on('change', function (e) {
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
    var indexloto = $(this).val();
    $('#myChart1').remove();
    $('#myChart2').remove();
    $('#myChart3').remove();
    $('iframe.chartjs-hidden-iframe').remove();
    $('#ctx1').append('<canvas style="background-color:white;" id="myChart1" width="400" height="400"></canvas>');
    $('#ctx2').append('<canvas style="background-color:white;" id="myChart2" width="400" height="400"></canvas>');
    $('#ctx3').append('<canvas style="background-color:white;" id="myChart3" width="400" height="400"></canvas>');
    
    ctx1 = document.getElementById('myChart1');
    ctx2 = document.getElementById('myChart2');
    ctx3 = document.getElementById('myChart3');

    mainstatics(globaldata, indexloto - 1);
});