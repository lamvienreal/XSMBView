function getsobong(input) {
    switch (input) {
        case '0':
            return '5';
        case '1':
            return '6';
        case '2':
            return '7';
        case '3':
            return '8';
        case '4':
            return '9';
        case '5':
            return '0';
        case '6':
            return '1';
        case '7':
            return '2';
        case '8':
            return '3';
        case '9':
            return '4';
    }
}
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

function get288s3d(c2, c8) {
    var result = [];
    var _64stmp = [];
    for (var l = 0; l < 10; l++) {
        c2.forEach(function (c, index) {
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
    c8.forEach(function (v, idx) {
        _64stmp.forEach(function (a, idx2) {
            result.push(v.toString() + a);
        });
    });
    return result;
}

function firstDayOfWeek(dateObject, firstDayOfWeekIndex) {

    const dayOfWeek = dateObject.getDay(),
        firstDayOfWeek = new Date(dateObject),
        diff = dayOfWeek >= firstDayOfWeekIndex ?
            dayOfWeek - firstDayOfWeekIndex :
            6 - dayOfWeek;

    firstDayOfWeek.setDate(dateObject.getDate() - diff);
    firstDayOfWeek.setHours(0, 0, 0, 0);

    return firstDayOfWeek;
}

var cList = [0, 1, 2, 3, 5, 6, 7, 9];
var cListStr = '[0, 1, 2, 3, 5, 6, 7, 9]';
var oxchart1 = ['start'];
var oychart1 = [50000];

var start_point = 1;
var ctx1 = document.getElementById('myChart1');


d3.json("https://raw.githubusercontent.com/bienhuynh/XSMBView/main/data/resultlotterytable.json", function (error, data) {
    if (error)
        throw error;


    var table = $('.itable>tbody');
    table[0].innerHTML = '';
    var html = '';
    var datelotterys = [];
    data.forEach(function (element, index) {
        if (!datelotterys.includes(element.DateLottery)) {
            datelotterys.push(element.DateLottery);
        }
    });
    for (var m = datelotterys.length - 1; m >= 0; m--) {
        var date = datelotterys[m];
        var resultlotterybydate = [];
        var resultlotterybydateforpredict = [];
        var datetime = new Date(date);
        datetime.setDate(datetime.getDate() - 14);
        let lastMonday = firstDayOfWeek(datetime, 1);
        var lastMondaystr = formatDate(lastMonday);
        oxchart1.push(date);
        data.find(function (element) {
            if (element.DateLottery === date) {
                resultlotterybydate.push(element);
            }

            if (element.DateLottery === lastMondaystr) {
                resultlotterybydateforpredict.push(element);
            }
        });
        var rl_html = '<tr>';
        rl_html += '<td class="text-center text-loterry">' + date + '</td>';
        var _288s = [];
        resultlotterybydateforpredict.forEach(function (element, index) {
            for (var i = 0; i < 27; i++) {

                if (element.NameLottery === 'G00') {
                    var ch1 = element.Value[0];
                    var ch2 = element.Value[element.Value.length - 1];
                    if (ch1 === ch2) {
                        ch2 = getsobong(ch1);
                    }
                    rl_html += '<td class="text-center text-loterry">' + element.Value + '</td>';
                    rl_html += '<td class="text-center text-loterry">' + ch1 + ', ' + ch2 + '</td>';
                    rl_html += '<td class="text-center text-loterry">' + cListStr + '</td>';

                    _288s = get288s3d([ch1, ch2], cList);
                    break;
                }
            }
        });

        resultlotterybydate.forEach(function (element, index) {

            for (var i = 0; i < 27; i++) {
                if (element.NameLottery === 'G00') {
                    var istrue = _288s.includes(element.Value.substring(element.Value.length - 3, element.Value.length));
                    rl_html += '<td class="text-center text-loterry">' + element.Value + '</td>';
                    rl_html += '<td class="text-center text-loterry ' + (istrue ? "text-true" : "text-fail") + '">' + _288s + '</td>';
                    oychart1.push(oychart1[oychart1.length - 1] + (istrue ? (972 - 288) * start_point : -288 * start_point));
                    break;
                }
            }
        });
        rl_html += '</tr>';
        html = rl_html + html;
    };
    table[0].innerHTML = html;

    var resultlotterybydateforpredict = [];
    var date = datelotterys[0];
    var datetime = new Date(date);
    datetime.setDate(datetime.getDate() + 1);
    datetime.setDate(datetime.getDate() - 14);
    let lastMonday = firstDayOfWeek(datetime, 1);
    var lastMondaystr = formatDate(lastMonday);
    data.find(function (element) {
        if (element.DateLottery === lastMondaystr) {
            resultlotterybydateforpredict.push(element);
        }
    });
    datetime.setDate(datetime.getDate() + 14);
    var _288s = [];
    var rl_html = '<tr>';
    rl_html += '<td class="text-center text-loterry">' + formatDate(datetime) + '</td>';
    resultlotterybydateforpredict.forEach(function (element, index) {
        for (var i = 0; i < 27; i++) {

            if (element.NameLottery === 'G00') {
                var ch1 = element.Value[0];
                var ch2 = element.Value[element.Value.length - 1];
                if (ch1 === ch2) {
                    ch2 = getsobong(ch1);
                }
                rl_html += '<td class="text-center text-loterry">' + element.Value + '</td>';
                rl_html += '<td class="text-center text-loterry">' + ch1 + ', ' + ch2 + '</td>';
                rl_html += '<td class="text-center text-loterry">' + cListStr + '</td>';

                _288s = get288s3d([ch1, ch2], cList);
                rl_html += '<td class="text-center text-loterry"></td>';
                rl_html += '<td class="text-center text-loterry">' + _288s + '</td>';
                break;
            }
        }
    });
    rl_html += '</tr>';
    _64s = [];
    html = rl_html + html;
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
});

