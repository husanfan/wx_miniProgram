function withData(param) {
    return param < 10 ? '0' + param : '' + param;
}

function getLoopArray(start, end, name) {
    var start = start || 0;
    var end = end || 1;
    var array = [];
    for (var i = start; i <= end; i++) {
        array.push(withData(i) + name || '');
    }
    return array;
}

function getMonthDay(year, month) {
    let years = year.replace(/['年']/g, "");
    let months = month.replace(/['月']/g, "");
    var flag = Number(years) % 400 == 0 || (Number(years) % 4 == 0 && Number(years) % 100 != 0),
        array = null;

    switch (months) {
        case '01':
        case '03':
        case '05':
        case '07':
        case '08':
        case '10':
        case '12':
            array = getLoopArray(1, 31, '日')
            break;
        case '04':
        case '06':
        case '09':
        case '11':
            array = getLoopArray(1, 30, '日')
            break;
        case '02':
            array = flag ? getLoopArray(1, 29, '日') : getLoopArray(1, 28, '日')
            break;
        default:
            array = getLoopArray(1, 31, '日')
    }
    return array;
}

function getNewDateArry() {
    // 当前时间的处理
    var newDate = new Date();
    var year = withData(newDate.getFullYear()) + '年',
        mont = withData(newDate.getMonth() + 1) + '月',
        date = withData(newDate.getDate()) + '日',
        hour = withData(newDate.getHours()) + '时',
        minu = withData(newDate.getMinutes()) + '分',
        seco = withData(newDate.getSeconds()) + '秒';

    return [year, mont, date, hour, minu, seco];
}

function dateTimePicker(startYear, endYear, date) {
    // 返回默认显示的数组和联动数组的声明
    var dateTime = [],
        dateTimeArray = [
            [],
            [],
            [],
            [],
            [],
            []
        ];
    var start = startYear || 1978;
    var end = endYear || 2100;
    // 默认开始显示数据
    var defaultDate = date ? [...date.split(' ')[0].split('-') + '年', ...date.split(' ')[1].split(':') + '月'] : getNewDateArry();
    // 处理联动列表数据
    /*年月日 时分秒*/
    dateTimeArray[0] = getLoopArray(start, end, '年');
    dateTimeArray[1] = getLoopArray(1, 12, '月');
    dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);
    dateTimeArray[3] = getLoopArray(0, 23, '时');
    dateTimeArray[4] = getLoopArray(0, 59, '分');
    dateTimeArray[5] = getLoopArray(0, 59, '秒');

    dateTimeArray.forEach((current, index) => {
        dateTime.push(current.indexOf(defaultDate[index]));
    });
    return {
        dateTimeArray: dateTimeArray,
        dateTime: dateTime
    }
}
module.exports = {
    dateTimePicker: dateTimePicker,
    getMonthDay: getMonthDay
}