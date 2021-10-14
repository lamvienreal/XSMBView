d3.json("https://raw.githubusercontent.com/bienhuynh/XSMBView/main/data/resultlotterytable_09_2021.json", function (error, data) {
    if (error)
        throw error;
    //create th
    var ths = $('.itable>thead>tr');
    var gName = ['G00', 'G11', 'G21', 'G22', 'G31',
        'G32', 'G33', 'G34', 'G35', 'G36',
        'G41', 'G42', 'G43', 'G44', 'G51',
        'G52', 'G53', 'G54', 'G55', 'G56',
        'G61', 'G62', 'G63', 'G71', 'G72',
        'G73', 'G74']

    //create th
    var ths = $('.itable>thead>tr');
    var th = document.createElement("th");
    th.class = "text-center";
    th.innerText = 'Ngày XS';
    ths.append(th);
    gName.forEach(function (el, index) {
        var th = document.createElement("th");
        th.class = "text-center";
        th.scope = "col";
        th.innerText = el;
        ths.append(th);
    });

    var table = $('.itable>tbody');
    table[0].innerHTML = '';
    var html = '';
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
        rl_html += '<th scope="row">' + date + '</th>';
        resultlotterybydate.forEach(function (element, index) {
            for (var i = 0; i < 27; i++) {

                if (element.NameLottery === gName[i]) {
                    var loto = element.Value.substring(element.Value.length - 2, element.Value.length);
                    rl_html += '<td data-title="' + element.NameLottery + '">' + element.Value.substring(0, element.Value.length - loto.length) + '<span style="background-color: red;">' + loto + '</span></td>';
                    break;
                }
            }
        });
        rl_html += '</tr>';
        html += rl_html;
    });
    table[0].innerHTML = html;
})