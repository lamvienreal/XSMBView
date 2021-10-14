var tablehead = $('.itable>thead');
tablehead[0].innerHTML = '';
var htmlheader = '<tr>';
htmlheader += '<th scope="col">Date Predict</th>';
htmlheader += '<th scope="col">Total Point</th>';
var cols = [37, 23, 44, 71, 24];
for (var i = 0; i <= cols.length - 1; i++) {
    htmlheader += '<th scope="col">L' + cols[i] + '</th>';
}
htmlheader += '<th scope="col">3D 01</th>';
htmlheader += '<th scope="col">3D 02</th>';
htmlheader += '<th scope="col">X2 Result</th>';
htmlheader += '<th scope="col">X3 Result</th>';
htmlheader += '<th scope="col">Total Result</th>';
htmlheader += '<th scope="col">Date Create</th>';
htmlheader += '</tr>';
tablehead[0].innerHTML = htmlheader;

function Oversem(num) {
    var result = 1;
    for (i = 1; i <= num; i++) {
        result *= i;
    }
    return result;
}

function calulatepercentwin(data) {
    var percentwin100lo = [];
    for (var i = 0; i < 100; i++) {
        percentwin100lo.push({
            Lx: i + 1,
            percent: 0
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
    return percentwin100lo;
}

d3.json("https://raw.githubusercontent.com/bienhuynh/XSMBView/main/data/result_full_predict_09_2021.json", function (error, data) {
    if (error)
        throw error;

    var table = $('.itable>tbody');
    table[0].innerHTML = '';
    var html = '';
    var numberwin3 = 0;
    var totalmoney = 0;
    data.forEach(function (element, index) {
        //Calulate percent 100 days
        var d = index - 100 >= 0 ? index - 100 : 0;
        if (index > 99000) {
            var data_100 = [];
            for (; d < index; d++) {
                data_100.push(data[d]);
            }
            var percent100lo = calulatepercentwin(data_100);
            cols[0] = percent100lo[0].Lx;
            cols[1] = percent100lo[1].Lx;
            cols[2] = percent100lo[2].Lx;
        }

        var rl_html = '<tr>';
        rl_html += '<th scope="row">' + element.DatePredict.substring(0, 10) + '</th>';
        rl_html += '<td data-title="Total Point">' + element.GoldPointPredict + '</td>';
        var iswin = 0;
        var loto3d = [];
        var profitloto3d = 0;
        var startpoint3d = 1;

        cols.forEach(function (col, index) {
            var loto = element.LotoPredicts[col - 1];
            if (index === 0 || index === 1) {
                loto3d.push(loto);
                profitloto3d += loto.IsTrue ? (972 - 230) * startpoint3d : -230 * startpoint3d;
            }
            var topvalue = (loto.IsTrue ? '(' + loto.LotoValue + ')' : loto.LotoValue) + ' ';
            rl_html += '<td class="' + (loto.IsTrue ? "text-true" : "text-fail") + '" data-title="' + 'L' + (col) + '">' + topvalue + '</td>';
            iswin += loto.IsTrue ? 1 : 0;
        });

        if (iswin > 0) {
            numberwin3++;
        }

        //Calulate X2 Result 

        var LXXs = cols;
        var f_start = 0;
        var f_end = LXXs.length;
        var x2wins = [];
        var startpointx2 = 30 * startpoint3d;
        var profitx2 = -1 * (LXXs.length * (LXXs.length - 1) / 2) * startpointx2;
        for (var i = f_start; i < f_end; i++) {
            for (j = i + 1; j < f_end; j++) {
                var loto1 = element.LotoPredicts[LXXs[i] - 1];
                var loto2 = element.LotoPredicts[LXXs[j] - 1];

                if (loto1.IsTrue && loto2.IsTrue) {
                    x2wins.push('(' + loto1.LotoValue + ')' + ' ' + '(' + loto2.LotoValue + ')');
                    profitx2 += 17 * startpointx2;
                    //profitlinear += 170 * start_bet_linear;
                    //revenuebymonthchart7 += 170 * start_bet_linear;
                }
            }
        }

        //Calulate X3 Result 
        f_start = 0;
        f_end = LXXs.length;
        var x3wins = [];
        var startpointx3 = startpointx2 / 2;
        var profitx3 = -1 * (Oversem(LXXs.length) / (Oversem(3) * Oversem(LXXs.length - 3))) * startpointx3;
        for (var i = f_start; i < f_end; i++) {
            for (j = i + 1; j < f_end; j++) {
                for (var g = j + 1; g < f_end; g++) {
                    var loto1 = element.LotoPredicts[LXXs[i] - 1];
                    var loto2 = element.LotoPredicts[LXXs[j] - 1];
                    var loto3 = element.LotoPredicts[LXXs[g] - 1];
                    if (loto1.IsTrue && loto2.IsTrue && loto3.IsTrue) {
                        x3wins.push('(' + loto1.LotoValue + ')' + ' ' + '(' + loto2.LotoValue + ')' + ' ' + '(' + loto3.LotoValue + ')');
                        profitx3 += 74 * startpointx3;
                        //profitlinear += 740 * start_bet_linear;
                        //revenuebymonthchart7 += 740 * start_bet_linear;
                    }
                }
            }
        }
        var totalprofilt = profitloto3d + profitx2 + profitx3;
        totalmoney += totalprofilt;
        rl_html += '<td class="' + (loto3d[0].IsTrue ? "text-true" : "text-fail") + '" data-title="3D 01">' + loto3d[0].LotoValue + '</td>';
        rl_html += '<td class="' + (loto3d[1].IsTrue ? "text-true" : "text-fail") + '" data-title="3D 02">' + loto3d[1].LotoValue + '</td>';
        rl_html += '<td class="' + (x2wins.length > 0 ? "text-true" : "text-fail") + '" data-title="X2 Result">' + x2wins + '</td>';
        rl_html += '<td class="' + (x3wins.length > 0 ? "text-true" : "text-fail") + '" data-title="X3 Result">' + x3wins + '</td>';
        rl_html += '<td class="' + (totalprofilt > 0 ? "text-true" : "text-fail") + '" data-title="Total Result">' + totalprofilt + '</td>';
        rl_html += '<td data-title="Date Create">' + element.TimePredict + '</td>';
        rl_html += '</tr>';
        html += rl_html;
    });
    console.log(totalmoney);
    $('#percent').text(numberwin3 * 100 / data.length + '%');
    table[0].innerHTML = html;

    console.log('Xien 4');
    var x4 = [], x3 = [];
    var top7 = [00, 89, 98, 10, 18, 34, 19, 45];
    for (var x = 0; x < top7.length; x++) {
        for (var y = x + 1; y < top7.length; y++) {
            for (var z = y + 1; z < top7.length; z++) {
                for (var k = z + 1; k < top7.length; k++) {
                    var arr = [top7[x], top7[y], top7[z], top7[k]];
                    x4.push(arr);
                }
            }
        }
    }
    console.log(x4);
    console.log('Xien 3');
    //top7 = [01, 02, 03];
    for (var x = 0; x < top7.length; x++) {
        for (var y = x + 1; y < top7.length; y++) {
            for (var z = y + 1; z < top7.length; z++) {
                var arr = [top7[x], top7[y], top7[z]];
                x3.push(arr);
            }
        }
    }

    console.log(x3);
});
