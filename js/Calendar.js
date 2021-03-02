
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1
const config = {
    show: 1,
}
const Index = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
}

function getHolidayClassTag(isHoliday) {
    return isHoliday ? 'is-holiday ' : ''
}

function getOtherMonthClassTag(isOtherMonth) {
    return isOtherMonth ? 'is-other-month ' : ''
}

function getEventHtml(year, month, day) {
    let calendarHtml = ''
    for (let i = 0; i < Category.length; i++) {
        let eventHtml = getEvent(year, month, day, Category[i])
        if (eventHtml !== '') {
            calendarHtml += '<div class="event-string category-' + Category[i] + '">' + eventHtml + '</div>'
        }
    }
    return calendarHtml
}

function getNextMonthEventHtml(year, month, day) {
    let calendarHtml = ''
    for (let i = 0; i < Category.length; i++) {
        let eventHtml = getNextMonthEvent(year, month, day, Category[i])
        if (eventHtml !== '') {
            calendarHtml += '<div class="is-other-month event-string category-' + Category[i] + '">' + eventHtml + '</div>'
        }
    }
    return calendarHtml
}

function getLastMonthEventHtml(year, month, day) {
    let calendarHtml = ''
    for (let i = 0; i < Category.length; i++) {
        let eventHtml = getLastMonthEvent(year, month, day, Category[i])
        if (eventHtml !== '') {
            calendarHtml += '<div class="is-other-month event-string category-' + Category[i] + '">' + eventHtml + '</div>'
        }
    }
    return calendarHtml
}

function getNextYearMonth(year, month) {
    if (month == 12) {
        year++
        month = 1
    } else {
        month++
    }
    return {year, month}
}

function getLastYearMonth(year, month) {
    if (month == 1) {
        year--
        month = 12
    } else {
        month--
    }
    return {year, month}
}

function createCalendar(year, month) {
    const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const startDate = new Date(year, month - 1, 1)
    const startDay = startDate.getDay()
    const endDate = new Date(year, month,  0)
    const endDayCount = endDate.getDate()
    const lastMonthEndDate = new Date(year, month-1, 0)
    const lastMonthEndDayCount = lastMonthEndDate.getDate()
    
    let dayCount = 1
    let calendarHtml = '<div class="year-month">' + year + '/' + month + '</div><table>'
    let finishMonth = false

    for (let w = 0; ; w++) {
        calendarHtml += '<tr>'
        let dayCountUp = true
        for (let d = 0; d < weeks.length; d++) {
            calendarHtml += '<td>'
            if (w == 0) {
                calendarHtml += '<div class="day-of-week-string">' + weeks[d] + '</div>'
            }
            if (w == 0 && d < startDay) {
                let num = lastMonthEndDayCount - startDay + d + 1
                let last = getLastYearMonth(year, month)
                calendarHtml += '<div class="day-string '
                calendarHtml += getHolidayClassTag(false)
                calendarHtml += getOtherMonthClassTag(true)
                calendarHtml += '">' + last.year + '/' + last.month + '/' + num + '</div>'
                calendarHtml += getLastMonthEventHtml(year, month, num)
                dayCountUp = false
            } else if (dayCount > endDayCount) {
                let num = dayCount - endDayCount
                let next = getNextYearMonth(year, month)
                calendarHtml += '<div class="day-string '
                calendarHtml += getHolidayClassTag(false)
                calendarHtml += getOtherMonthClassTag(true)
                calendarHtml += '">' + next.year + '/' + next.month + '/' + num + '</div>'
                calendarHtml += getNextMonthEventHtml(year, month, num)
                finishMonth = true
            } else if ((d === Index.Sunday) || (d === Index.Saturday)) {
                calendarHtml += '<div class="day-string '
                calendarHtml += getHolidayClassTag(!isWorkDay(year, month, dayCount))
                calendarHtml += getOtherMonthClassTag(false)
                calendarHtml += '">' + dayCount + '</div>'
                calendarHtml += getEventHtml(year, month, dayCount)
            } else {
                calendarHtml += '<div class="day-string '
                calendarHtml += getHolidayClassTag(isHoliday(year, month, dayCount))
                calendarHtml += getOtherMonthClassTag(false)
                calendarHtml += '">' + dayCount + '</div>'
                calendarHtml += getEventHtml(year, month, dayCount)
            }
            calendarHtml += '</td>'
            if (dayCount === endDayCount) {
                finishMonth = true
            }
            if (dayCountUp) {
                dayCount++
            } else {
                dayCountUp = true
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
