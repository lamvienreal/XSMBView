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
        }
    });
    result.push(_64stmp);
    result.push(c4);
    return result;
}
// odd: false. even: true;
function parity_classification(num2, num1) {
    //if even then true, else false
    var parity_n1 = num1 % 2 === 0;
    if (num1 === 1 || num1 === 0) {
        if (num2 % 2 === 0) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        if (parity_n1) {
            if (num2 === 1 || num2 === 0) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            if (num2 === 1 || num2 === 0) {
                return true;
            }
            else {
                return false;
            }
        }
    }
}

d3.json("https://raw.githubusercontent.com/bienhuynh/XSMBView/main/data/resultlotterytable_09_2021.json", function (error, data) {
    if (error)
        throw error;
    var _64s = [];
    var start_point = 10;
    var investday = -64 * start_point;
    var winday = 99 * start_point;
    //chart
    var oxchart1 = ['start'];
    var oychart1 = [90000];
    var oxchart2 = ['start'];
    var oychart2 = [90000];

    var ctx1 = document.getElementById('myChart1');
    var ctx2 = document.getElementById('myChart2');
    //var ctx3 = document.getElementById('myChart3');
    //var ctx4 = document.getElementById('myChart4');
    var table = $('.itable>tbody');
    var table_1 = $('.itable-1>tbody');

    table[0].innerHTML = '';
    table_1[0].innerHTML = '';
    var html = '';
    var html_1 = '';
    //Find Datelottery
    var datelotterys = [];
    data.forEach(function (element, index) {
        if (!datelotterys.includes(element.DateLottery)) {
            datelotterys.push(element.DateLottery);
        }
    });

    //oxy for predict
    var predicts_col_g00 = [];
    var predicts_col_g11 = [];
    for (var iday = datelotterys.length - 1; iday >= 0; iday--) {
        _64s.push(["-1", "-2"]);
        _64s.push(["-1", "-2"]);
        var date = datelotterys[iday];
        oxchart1.push(date);
        oxchart2.push(date);
        //Tim cac giai thuong cua ngay do
        var resultlotterybydate = [];
        data.find(function (element) {
            if (element.DateLottery === date) {
                resultlotterybydate.push(element);
            }
        });
        var rl_html = '<tr>';
        var rl_html_1 = '<tr>';
        rl_html += '<td class="text-center text-loterry">' + date + '</td>';
        rl_html_1 += '<td class="text-center text-loterry">' + date + '</td>';
        resultlotterybydate.forEach(function (element, index) {
            if (element.NameLottery === "G00") {
                var g00_2 = element.Value.substring(element.Value.length - 2, element.Value.length);
                var icol = element.Value.length - 1;
                //Table 0
                var rl_html_g = '<td class="text-center text-loterry ' + (_64s[0].includes(g00_2) ? "text-true" : "text-fail") + '">' + element.Value + '</td>';
                var parity5 = element.Value[icol] % 2 === 0;
                var rl_html_p = '<td class="text-center text-loterry ' + (element.Value[icol] % 2 === 0 ? "text-even" : "text-odd") + '">' + element.Value[icol--] + '</td>';
                
                var parity4 = element.Value[icol] % 2 === 0;
                rl_html_p = '<td class="text-center text-loterry ' + (element.Value[icol] % 2 === 0 ? "text-even" : "text-odd") + '">' + element.Value[icol--] + '</td>' + rl_html_p;
                
                var parity3 = element.Value[icol] % 2 === 0;
                rl_html_p = '<td class="text-center text-loterry ' + (element.Value[icol] % 2 === 0 ? "text-even" : "text-odd") + '">' + element.Value[icol--] + '</td>' + rl_html_p;
                
                var parity2 = element.Value[icol] % 2 === 0;
                rl_html_p = '<td class="text-center text-loterry ' + (element.Value[icol] % 2 === 0 ? "text-even" : "text-odd") + '">' + element.Value[icol--] + '</td>' + rl_html_p;
                
                var parity1 = element.Value[icol] % 2 === 0;
                rl_html_p = '<td class="text-center text-loterry ' + (element.Value[icol] % 2 === 0 ? "text-even" : "text-odd") + '">' + element.Value[icol--] + '</td>' + rl_html_p;
                
                rl_html += rl_html_g + rl_html_p;
                //Table 1: Predict 5 columns
                icol = 0;
                var rl_html_p_1 = '<td class="text-center text-loterry">' + element.Value[icol] + '</td>';
                var p4 = parity_classification(parseInt(element.Value[icol]), parseInt(element.Value[icol + 1]));
                icol++;
                rl_html_p_1 += '<td class="text-center text-loterry ' + (predicts_col_g00.length === 4 ? predicts_col_g00[0] ? "text-even" : "text-odd" : '') + '">' + element.Value[icol++] + '</td>';

                var p3 = parity_classification(parseInt(element.Value[icol]), parseInt(element.Value[icol + 1]));
                rl_html_p_1 += '<td class="text-center text-loterry ' + (predicts_col_g00.length === 4 ? predicts_col_g00[1] ? "text-even" : "text-odd" : '') + '">' + element.Value[icol++] + '</td>';

                var p2 = parity_classification(parseInt(element.Value[icol]), parseInt(element.Value[icol + 1]));
                rl_html_p_1 += '<td class="text-center text-loterry ' + (predicts_col_g00.length === 4 ? predicts_col_g00[2] ? "text-even" : "text-odd" : '') + '">' + element.Value[icol++] + '</td>';

                var p1 = parity_classification(parseInt(element.Value[icol]), parseInt(element.Value[icol + 1]));
                rl_html_p_1 += '<td class="text-center text-loterry ' + (predicts_col_g00.length === 4 ? predicts_col_g00[3] ? "text-even" : "text-odd" : '') + '">' + element.Value[icol++] + '</td>';
                var rl_html_g_1 = '';
                if (predicts_col_g00.length === 4) {
                    rl_html_g_1 = '<td class="text-center text-loterry ' +
                        ((predicts_col_g00[0] && parity1) && (predicts_col_g00[1] && parity2) && (predicts_col_g00[2] && parity3) ? "text-true" : "text-fail") + '">'
                        + element.Value + '</td>';
                    predicts_col_g00.splice(0, 4);
                }
                else {
                    rl_html_g_1 = '<td class="text-center text-loterry">' + element.Value + '</td>';
                }
                
                rl_html_1 += rl_html_g_1 + rl_html_p_1;
                predicts_col_g00.push(p4);
                predicts_col_g00.push(p3);
                predicts_col_g00.push(p2);
                predicts_col_g00.push(p1);
                oychart1.push(oychart1[oychart1.length - 1] + (_64s[0].includes(g00_2) ? investday + winday : investday));
            }

            if (element.NameLottery === "G11") {
                var g11_2 = element.Value.substring(element.Value.length - 2, element.Value.length);
                var icol = element.Value.length - 1;
                //Table 0
                var rl_html_g = '<td class="text-center text-loterry ' + (_64s[0].includes(g11_2) ? "text-true" : "text-fail") + '">' + element.Value + '</td>';
                var parity5 = element.Value[icol] % 2 === 0;
                var rl_html_p = '<td class="text-center text-loterry ' + (element.Value[icol] % 2 === 0 ? "text-even" : "text-odd") + '">' + element.Value[icol--] + '</td>';

                var parity4 = element.Value[icol] % 2 === 0;
                rl_html_p += '<td class="text-center text-loterry ' + (element.Value[icol] % 2 === 0 ? "text-even" : "text-odd") + '">' + element.Value[icol--] + '</td>';

                var parity3 = element.Value[icol] % 2 === 0;
                rl_html_p += '<td class="text-center text-loterry ' + (element.Value[icol] % 2 === 0 ? "text-even" : "text-odd") + '">' + element.Value[icol--] + '</td>';

                var parity2 = element.Value[icol] % 2 === 0;
                rl_html_p += '<td class="text-center text-loterry ' + (element.Value[icol] % 2 === 0 ? "text-even" : "text-odd") + '">' + element.Value[icol--] + '</td>';

                var parity1 = element.Value[icol] % 2 === 0;
                rl_html_p += '<td class="text-center text-loterry ' + (element.Value[icol] % 2 === 0 ? "text-even" : "text-odd") + '">' + element.Value[icol--] + '</td>';
                rl_html += rl_html_g + rl_html_p;

                //Table 1
                icol = 0;
                var rl_html_p_1 = '<td class="text-center text-loterry">' + element.Value[icol] + '</td>';
                var p4 = parity_classification(parseInt(element.Value[icol]), parseInt(element.Value[icol + 1]));
                icol++;
                rl_html_p_1 += '<td class="text-center text-loterry ' + (predicts_col_g11.length === 4 ? predicts_col_g11[0] ? "text-even" : "text-odd" : '') + '">' + element.Value[icol++] + '</td>';

                var p3 = parity_classification(parseInt(element.Value[icol]), parseInt(element.Value[icol + 1]));
                rl_html_p_1 += '<td class="text-center text-loterry ' + (predicts_col_g11.length === 4 ? predicts_col_g11[1] ? "text-even" : "text-odd" : '') + '">' + element.Value[icol++] + '</td>';

                var p2 = parity_classification(parseInt(element.Value[icol]), parseInt(element.Value[icol + 1]));
                rl_html_p_1 += '<td class="text-center text-loterry ' + (predicts_col_g11.length === 4 ? predicts_col_g11[2] ? "text-even" : "text-odd" : '') + '">' + element.Value[icol++] + '</td>';

                var p1 = parity_classification(parseInt(element.Value[icol]), parseInt(element.Value[icol + 1]));
                rl_html_p_1 += '<td class="text-center text-loterry ' + (predicts_col_g11.length === 4 ? predicts_col_g11[3] ? "text-even" : "text-odd" : '') + '">' + element.Value[icol++] + '</td>';

                var rl_html_g_1 = '';
                if (predicts_col_g11.length === 4) {
                    rl_html_g_1 = '<td class="text-center text-loterry ' +
                        ((predicts_col_g11[0] && parity1) && (predicts_col_g11[1] && parity2) && (predicts_col_g11[2] && parity3) ? "text-true" : "text-fail") + '">'
                        + element.Value + '</td>';
                    predicts_col_g11.splice(0, 4);
                }
                else {
                    rl_html_g_1 = '<td class="text-center text-loterry">' + element.Value + '</td>';
                }
                rl_html_1 += rl_html_g_1 + rl_html_p_1;

                predicts_col_g11.push(p4);
                predicts_col_g11.push(p3);
                predicts_col_g11.push(p2);
                predicts_col_g11.push(p1);
                oychart2.push(oychart2[oychart2.length - 1] + (_64s[0].includes(g11_2) ? investday + winday : investday));
            }
        });
        //rl_html += '<td class="text-center text-loterry">' + _64s[1][0] + ', ' + _64s[1][1] + ', ' + _64s[1][2] + ', ' + _64s[1][3] + '</td>'
        //rl_html += '<td class="text-center text-loterry">' + _64s[0] + '</td>'
        rl_html += '</tr>';
        rl_html_1 += '</tr>';
        _64s = [];
        html = rl_html + html;
        html_1 = rl_html_1 + html_1;
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
    rl_html += '<td class="text-center text-loterry">Chờ kết quả</td>';
    rl_html += '<td class="text-center text-loterry">Chờ kết quả</td>';
    //rl_html += '<td class="text-center text-loterry">' + _64s[1][0] + ', ' + _64s[1][1] + ', ' + _64s[1][2] + ', ' + _64s[1][3] + '</td>'
    //rl_html += '<td class="text-center text-loterry">' + _64s[0] + '</td>'
    rl_html += '</tr>';
    _64s = [];
    html_1 = rl_html + html_1;
    table[0].innerHTML = html;
    table_1[0].innerHTML = html_1;

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
})