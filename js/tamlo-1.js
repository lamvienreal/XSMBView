var tablehead = $('.itable>thead');
tablehead[0].innerHTML = '';
var htmlheader = '<tr>';
htmlheader += '<th scope="col">Date Predict</th>';
htmlheader += '<th scope="col">Total Point</th>';
var cols = [27, 37, 61];
for (var i = 0; i <= cols.length - 1; i++) {
    htmlheader += '<th scope="col">L' + cols[i] + '</th>';
}
htmlheader += '<th scope="col">Date Create</th>';
htmlheader += '</tr>';
tablehead[0].innerHTML = htmlheader;
var percentwin100lo = [];

function calulatepercentwin(data) {

    for (var i = 0; i < 100; i++) {
        percentwin100lo.push({
            Lx: i + 1,
            percent: 0
        });
        var numberdaywin = 0;
        for (var k = data.length - 1; k >= data.length - 100; k--) {
            var element = data[k];
            var date = element.DatePredict.substring(0, 10);
            var loto = element.LotoPredicts[i];
            if (loto.IsTrue) {
                numberdaywin++;
            }
            console.log(k);
        };
        percentwin100lo[i].percent = (numberdaywin / data.length) * 100;
    }
    percentwin100lo.sort(function (a, b) { return b.percent - a.percent });
}

d3.json("https://raw.githubusercontent.com/bienhuynh/XSMBView/main/data/result_full_predict_09_2021.json", function (error, data) {
    if (error)
        throw error;
    
    var table = $('.itable>tbody');
    table[0].innerHTML = '';
    var html = '';
    data.forEach(function (element) {
        var rl_html = '<tr>';
        rl_html += '<th scope="row">' + element.DatePredict.substring(0, 10) + '</th>';
        rl_html += '<td data-title="Total Point">' + element.GoldPointPredict + '</td>';
        cols.forEach(function (col, index) {
            var loto = element.LotoPredicts[col - 1];
            var topvalue = (loto.IsTrue ? '(' + loto.LotoValue + ')' : loto.LotoValue) + ' ';
            rl_html += '<td class="' + (loto.IsTrue ? "text-true" : "text-fail") + '" data-title="' + 'L' + (col) + '">' + topvalue + '</td>';
        });
        var date = new Date(element.TimePredict);
        var newdate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

        rl_html += '<td data-title="Date Create">' + newdate + '</td>';
        rl_html += '</tr>';
        html += rl_html;
    });
    table[0].innerHTML = html;
});