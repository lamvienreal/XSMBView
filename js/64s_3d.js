d3.json("https://raw.githubusercontent.com/bienhuynh/XSMBView/main/data/resultlotterytable.json", function (error, data) {
    if (error)
        throw error;
    var _64s = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
                '11', '12', '13', '14', '16', '20', '21', '22', '23', '27', '29',
                '30', '31', '32', '33', '35', '36', '37', '38', '40', '41',
                '44', '45', '46', '47', '50', '53', '54', '55', '56', '59',
                '60', '61', '63', '64', '65', '66', '67', '68', '70', '73',
                '74', '76', '77', '79', '80', '83', '86', '88', '89', '90',
        '92', '95', '98'];
    var _384s = [];
    var _3dconnect = [1, 2, 3, 5, 6, 7, 9];
    _64s.forEach(function (el, index1) {
        _3dconnect.forEach(function (d, index2) {
            _384s.push(d.toString() + el.toString());
        });
    });
    var _64s_str = '[01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 16, 20, 21, 23, 27, 29, 30, 31, 32, 33, 35, 36, 37, 38, 40, 41, 44, 45, 46, 47, 50, 53, 54, 55, 56, 59, 60, 61, 63, 64, 65, 66, 67, 68, 70, 73, 74, 76, 77, 79, 80, 83, 86, 88, 89, 90, 92, 95, 98]';
    //create th
    //var ths = $('.itable>thead>tr');
    //_64s.forEach(function (el, index) {
    //    var th = document.createElement("th");
    //    th.class = "text-center";
    //    th.innerText = (index + 1) + 'th';
    //    ths.append(th);
    //});

    var table = $('.itable>tbody');
    table[0].innerHTML = '';
    var html = '';
    var profitall = 0;
    var profitbymonths = [];
    var profitmonth = 0;
    //Find Datelottery
    var datelotterys = [];
    data.forEach(function (element, index) {
        if (!datelotterys.includes(element.DateLottery)) {
            datelotterys.push(element.DateLottery);
        }
    });
    datelotterys.forEach(function (date, index) {
        var resultlotterybydate = [];
        data.find(function (element) {
            if (element.DateLottery === date) {
                resultlotterybydate.push(element);
            }
        });
        var rl_html = '<tr>';
        rl_html += '<td class="text-center text-loterry">' + date + '</td>';
        var profit = -2 * _384s.length;
        resultlotterybydate.forEach(function (element, index) {
            if (element.NameLottery === "G00") {
                var g00_3 = element.Value.substring(element.Value.length - 3, element.Value.length);
                rl_html += '<td class="text-center text-loterry ' + (_384s.includes(g00_3) ? "text-true" : "text-fail") + '">' + g00_3 + '</td>';
                if (_384s.includes(g00_3)) {
                    profit += 972.5;
                }
            }

            if (element.NameLottery === "G11") {
                var g11_3 = element.Value.substring(element.Value.length - 3, element.Value.length);
                rl_html += '<td class="text-center text-loterry ' + (_384s.includes(g11_3) ? "text-true" : "text-fail") + '">' + g11_3 + '</td>';
                if (_384s.includes(g11_3)) {
                    profit += 972.5;
                }
            }
        });
        rl_html += '<td class="text-center text-loterry ' + (profit > 0 ? "text-true" : "text-fail") + '">' + profit + '</td>';
        rl_html += '</tr>';
        profitall += profit;
        if (date.substring(date.length - 2, date.length) === '01') {
            profitbymonths.push(profitmonth);
            profitmonth = 0;
        }
        profitmonth += profit;
        html += rl_html;
    });
    console.log(profitall);
    console.log(profitbymonths);
    table[0].innerHTML = html;
})