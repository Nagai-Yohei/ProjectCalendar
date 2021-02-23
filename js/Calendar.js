
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const config = {
    show: 3,
}

function getYearAndMonth(year, month) {
    return ('<h1>' + year  + '/' + month + '</h1>')
}

function getDayOfWeekTable(){
    const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let txt = ''
    for (let i = 0; i < weeks.length; i++) {
        txt += '<td>' + weeks[i] + '</td>'
    }
    return txt
}

function createCalendar(year, month) {
    const startDate = new Date(year, month - 1, 1)
    const startDay = startDate.getDay()
    const endDate = new Date(year, month,  0)
    const endDayCount = endDate.getDate()
    const lastMonthEndDate = new Date(year, month-1, 0)
    const lastMonthEndDayCount = lastMonthEndDate.getDate()
    
    let dayCount = 1
    let calendarHtml = ''
    let finishMonth = false
    
    calendarHtml += getYearAndMonth(year, month)
    calendarHtml += '<table>'
    calendarHtml += getDayOfWeekTable()
    
    for (let w = 0; ; w++) {
        calendarHtml += '<tr>'
        for (let d = 0; d < 7; d++) {
            if (w == 0 && d < startDay) {
                let num = lastMonthEndDayCount - startDay + d + 1
                calendarHtml += '<td class="is-disabled">' + num + '</td>'
            } else if (dayCount > endDayCount) {
                let num = dayCount - endDayCount
                calendarHtml += '<td class="is-disabled">' + num + '</td>'
                finishMonth = true
                dayCount++
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
    return calendarHtml
}

function showCalendar(year, month) {
    for (let i = 0; i < config.show; i++) {
        const calendarHtml = createCalendar(year, month)
        const sec = document.createElement('section')
        sec.innerHTML = calendarHtml
        document.querySelector('#calendar').appendChild(sec)

        month++
        if (month > 12) {
            year++
            month = 1
        }
    }
}

showCalendar(year, month)
