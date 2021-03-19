const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1
const Index = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
}

function getEvent(year, month, day, category) {
    let ret = new Array()
    for (let i = 0; i < Events.length; i++) {
        if (Events[i].year === year && Events[i].month === month && Events[i].day === day && Events[i].category === category) {
            ret.push(Events[i].milestone)
        }
    }
    return ret
}

function getLastMonthEvent(year, month, day, category) {
    let ret = new Array()
    if (month === 1) {
        ret = getEvent(year - 1, 12, day, category)
    } else {
        ret = getEvent(year, month - 1, day, category)
    }
    return ret
}

function getNextMonthEvent(year, month, day, category) {
    let ret = new Array()
    if (month === 12) {
        ret = getEvent(year + 1, 1, day, category)
    } else {
        ret = getEvent(year, month + 1, day, category)
    }
    return ret
}

function generateEvent(evDate, evId) {
    let ev = evDate
    let newId = evDate[evDate.length - 1].id + 1
    for (let i = 0; i < evId.length; i++) {
        for (let j = 0; j < evDate.length; j++) {
            if (evDate[j].id === evId[i].refid) {
                let td = new Date(evDate[j].year, evDate[j].month - 1, evDate[j].day)
                td.setDate(td.getDate() + evId[i].dayafter)
                let te = {"id":newId, "year":td.getFullYear(), "month":td.getMonth() + 1, "day":td.getDate(), "category":j, "milestone":evId[i].milestone}
                ev.push(te)
                newId++
            }
        }
    }
    return ev
}

function getEventHtml(year, month, day) {
    let calendarHtml = ''
    for (let i = 0; i < Category.length; i++) {
        let eventHtml = getEvent(year, month, day, i)
        if (eventHtml.length > 0) {
            for (let j = 0; j < eventHtml.length; j++) {
                calendarHtml += '<div class="event-string category cat' + i + '">' + eventHtml[j] + '</div>'
            }
        }
    }
    return calendarHtml
}

function getNextMonthEventHtml(year, month, day) {
    let calendarHtml = ''
    for (let i = 0; i < Category.length; i++) {
        let eventHtml = getNextMonthEvent(year, month, day, i)
        if (eventHtml.length > 0) {
            for (let j = 0; j < eventHtml.length; j++) {
                calendarHtml += '<div class="is-other-month event-string category cat' + i + '">' + eventHtml[j] + '</div>'
            }
        }
    }
    return calendarHtml
}

function getLastMonthEventHtml(year, month, day) {
    let calendarHtml = ''
    for (let i = 0; i < Category.length; i++) {
        let eventHtml = getLastMonthEvent(year, month, day, i)
        if (eventHtml.length > 0) {
            for (let j = 0; j < eventHtml.length; j++) {
                calendarHtml += '<div class="is-other-month event-string category cat' + i + '">' + eventHtml[j] + '</div>'
            }
        }
    }
    return calendarHtml
}

function isHoliday(year, month, day) {
    let ret = false
    for (let i = 0; i < Holiday.length; i++) {
        ret = ret || (Holiday[i].year === year && Holiday[i].month === month && Holiday[i].day === day)
    }
    return ret
}

function isWorkDay(year, month, day) {
    let ret = false
    for (let i = 0; i < Workday.length; i++) {
        ret = ret || (Workday[i].year === year && Workday[i].month === month && Workday[i].day === day)
    }
    return ret
}

function getHolidayClassTag(isHoliday) {
    return isHoliday ? 'is-holiday ' : ''
}

function getOtherMonthClassTag(isOtherMonth) {
    return isOtherMonth ? 'is-other-month ' : ''
}

function getTodayClassTag(isToday) {
    return isToday ? 'is-today ' : ''
}

function isToday(year, month, day) {
    let today = new Date();
    return (year === today.getFullYear() && month === (today.getMonth() + 1) && day === today.getDate())
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
    let calendarHtml = '<div class="year-month">' + year + '/' + month + '</div><table class="calendar-table">'
    let finishMonth = false

    for (let w = 0; ; w++) {
        calendarHtml += '<tr>'
        let dayCountUp = true
        for (let d = 0; d < weeks.length; d++) {
            calendarHtml += '<td class="calendar-td">'
            if (w == 0) {
                calendarHtml += '<div class="week">' + weeks[d] + '</div>'
            }
            if (w == 0 && d < startDay) {
                let num = lastMonthEndDayCount - startDay + d + 1
                let last = getLastYearMonth(year, month)
                calendarHtml += '<div class="'
                calendarHtml += getHolidayClassTag(false)
                calendarHtml += getOtherMonthClassTag(true)
                calendarHtml += '">' + last.year + '/' + last.month + '/' + num + '</div>'
                calendarHtml += getLastMonthEventHtml(year, month, num)
                dayCountUp = false
            } else if (dayCount > endDayCount) {
                let num = dayCount - endDayCount
                let next = getNextYearMonth(year, month)
                calendarHtml += '<div class="'
                calendarHtml += getHolidayClassTag(false)
                calendarHtml += getOtherMonthClassTag(true)
                calendarHtml += '">' + next.year + '/' + next.month + '/' + num + '</div>'
                calendarHtml += getNextMonthEventHtml(year, month, num)
                finishMonth = true
            } else if ((d === Index.Sunday) || (d === Index.Saturday)) {
                calendarHtml += '<div class="'
                calendarHtml += getHolidayClassTag(!isWorkDay(year, month, dayCount))
                calendarHtml += getOtherMonthClassTag(false)
                calendarHtml += getTodayClassTag(isToday(year, month, dayCount))
                calendarHtml += '">' + dayCount + '</div>'
                calendarHtml += getEventHtml(year, month, dayCount)
            } else {
                calendarHtml += '<div class="'
                calendarHtml += getHolidayClassTag(isHoliday(year, month, dayCount))
                calendarHtml += getOtherMonthClassTag(false)
                calendarHtml += getTodayClassTag(isToday(year, month, dayCount))
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
    if (e.target.id === 'today') {
        let today = new Date();
        year = today.getFullYear();
        month = today.getMonth() + 1;
    }
    showCalendar(year, month)
}

let Events = generateEvent(EventDate, EventId)

document.querySelector('#prev').addEventListener('click', moveCalendar)
document.querySelector('#next').addEventListener('click', moveCalendar)
document.querySelector('#today').addEventListener('click', moveCalendar)

showCalendar(year, month)
