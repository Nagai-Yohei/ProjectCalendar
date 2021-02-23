
const date = new Date()

const year = date.getFullYear()
const month = date.getMonth() + 1

// 月の最初の日と曜日を取得
const startDate = new Date(year, month - 1, 1)
const startDay = startDate.getDay()

// 月の最後の日を取得
const endDate = new Date(year, month,  0)
const endDayCount = endDate.getDate()


let dayCount = 1
let calendarHtml = ''
let finishMonth = false

console.log(endDayCount)

calendarHtml += '<h1>' + year  + '/' + month + '</h1>'
calendarHtml += '<table>'

function GetDayOfWeekTable(){
    const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let txt = ''
    for (let i = 0; i < weeks.length; i++) {
        txt += '<td>' + weeks[i] + '</td>'
    }
    return txt
}

calendarHtml += GetDayOfWeekTable()

for (let w = 0; ; w++) {
    calendarHtml += '<tr>'

    for (let d = 0; d < 7; d++) {
        if (w == 0 && d < startDay) {
            // 1行目で1日の曜日の前
            calendarHtml += '<td></td>'
        } else if (dayCount > endDayCount) {
            // 末尾の日数を超えた
            calendarHtml += '<td></td>'
            finishMonth = true
        } else {
            calendarHtml += '<td>' + dayCount + '</td>'
            dayCount++
        }
    }
    calendarHtml += '</tr>'

    if (finishMonth) {
        break
    }
}
calendarHtml += '</table>'

document.querySelector('#calendar').innerHTML = calendarHtml
