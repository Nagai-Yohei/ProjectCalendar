
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1
const config = {
    show: 3,
}

function createCalendar(year, month) {
    const weeks = ['Project', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const startDate = new Date(year, month - 1, 1)
    const startDay = startDate.getDay()
    const endDate = new Date(year, month,  0)
    const endDayCount = endDate.getDate()
    const lastMonthEndDate = new Date(year, month-1, 0)
    const lastMonthEndDayCount = lastMonthEndDate.getDate()
    
    let dayCount = 1
    let calendarHtml = ''
    let finishMonth = false
    let holidayCount = 0
    
    calendarHtml += '<h1>' + year  + '/' + month + '</h1>'
    calendarHtml += '<table>'
    for (let i = 0; i < weeks.length; i++) {
        calendarHtml += '<td>' + weeks[i] + '</td>'
    }
    
    for (let w = 0; ; w++) {
        calendarHtml += '<tr><td></td>'
        for (let d = 1; d < weeks.length; d++) {
            if (w == 0 && d < startDay + 1) {
                let num = lastMonthEndDayCount - startDay + d
                calendarHtml += '<td class="is-disabled">' + num + '</td>'
            } else if (dayCount > endDayCount) {
                let num = dayCount - endDayCount
                calendarHtml += '<td class="is-disabled">' + num + '</td>'
                finishMonth = true
                dayCount++
            } else {
                if (Holiday[holidayCount].year === year && Holiday[holidayCount].month === month && Holiday[holidayCount].day === dayCount) {
                    calendarHtml += '<td class="is-holiday">' + dayCount + '</td>'
                    holidayCount++
                } else {
                    calendarHtml += '<td>' + dayCount + '</td>'
                }
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

function moveCalendar(e) {
    document.querySelector('#calendar').innerHTML = ''
    if (e.target.id === 'prev') {
        month--
        if (month < 1) {
            year--
            month = 12
        }
    }
    if (e.target.id === 'next') {
        month++
        if (month > 12) {
            year++
            month = 1
        }
    }
    showCalendar(year, month)
}

document.querySelector('#prev').addEventListener('click', moveCalendar)
document.querySelector('#next').addEventListener('click', moveCalendar)

showCalendar(year, month)
