/**
 * TODO 本功能需要layer和jquery插件的支持； 本功能为二次开发。
 * @see 源文件地址：http://sc.chinaz.com/jiaobendemo.aspx?downloadid=0201785541739
 */
var layer;
layui.use('layer', function () {
    layer = layui.layer;
});
// 去除0 参数 日期 如 2020-07-08 返回为 2020-7-8
function dislodgeZero(str) {
    let strArray = str.split("-");
    strArray = strArray.map(function(val) {
        if (val[0] == "0") {
            return (val = val.slice(1));
        } else {
            return val;
        }
    });
    return strArray.join("-");
}

function main() {
    if (typeof (layer) != "object" || !layer) {
        setTimeout("main()", 400);
        return;
    }
    var myCalendar = new SimpleCalendar('#calendar', {
        width: '100%',
        height: '500px',
        language: 'EN', //语言
        showLunarCalendar: false, //阴历
        showHoliday: false, //休假-暂时禁用
        showFestival: false, //节日
        showLunarFestival: false, //农历节日
        showSolarTerm: false, //节气
        showMark: true, //标记
        realTime: false, //具体时间
        timeRange: {
            startYear: 2002,
            endYear: 2049
        },
        mark: {},
        markColor: ['#82C43C', '#1E75FF', '#FF9AD5', '#DDDF00', '#FF974A'],//记事各个颜色
        main: function (year, month) {
            // alert("[获取数据]" + year + "--->" + month);
            var index = -1;
            if (layer) index = layer.msg('正在查询数据......', {icon: 16, shade: 0.6});
            //@-这里获取数据：
            console.log(year + "--->" + month);


            var localTest = localStorage.getItem('test');
            console.log(localTest); //结果：小黑
            var jsonArray = JSON.parse(localTest);
            var resultObj = {};
            for(var i in jsonArray){
                var array = [];
                var date = dislodgeZero(jsonArray[i].date);
                // var date2 = "2022-5-11";

                console.log(date)
                // console.log(date2)
                array.push({
                    title: jsonArray[i].task,
                    name: jsonArray[i].content,
                    prior: jsonArray[i].prior,
                    type: jsonArray[i].type
                });
                resultObj[date] = array;
            }

            console.log(resultObj);
            if (layer) layer.close(index);
            return resultObj;
        },
        theme: {
            changeAble: false,
            weeks: {
                backgroundColor: 'white',
                fontColor: '#4A4A4A',
                fontSize: '20px',
            },
            days: {
                backgroundColor: '#ffffff',
                fontColor: '#565555',
                fontSize: '24px'
            },
            todaycolor: 'orange',
            activeSelectColor: 'orange',
        }
    });
}

main();
