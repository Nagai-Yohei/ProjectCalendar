
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1
const config = {
    show: 2,
}
const Index = {
    Project: 0,
    Sunday: 1,
    Monday: 2,
    Tuesday: 3,
    Wednesday: 4,
    Thursday: 5,
    Friday: 6,
    Saturday: 7,
}

function createCalendarInitialize(year, month, weeks) {
    let calendarHtml = ''
    calendarHtml += '<h1>' + year  + '/' + month + '</h1>'
    calendarHtml += '<table>'
    for (let i = 0; i < weeks.length; i++) {
        calendarHtml += '<td>' + weeks[i] + '</td>'
    }
    return calendarHtml
}

function createCalendarHoliday(year, month, day) {
    let calendarHtml = ''
    if (isWorkDay(year, month, day)) {
        calendarHtml = '<td>' + day + '</td>'
    } else {
        calendarHtml = '<td class="is-holiday">' + day + '</td>'
    }
    return calendarHtml
}

function createCalendarWorkday(year, month, day) {
    let calendarHtml = ''
    if (isHoliday(year, month, day)) {
        calendarHtml = '<td class="is-holiday">' + day + '</td>'
    } else {
        calendarHtml = '<td>' + day + '</td>'
    }
    return calendarHtml
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
    
    calendarHtml += createCalendarInitialize(year, month, weeks)
    
    for (let w = 0; ; w++) {
        calendarHtml += '<tr><td></td>'
        for (let d = Index.Sunday; d < weeks.length; d++) {
            if (w == 0 && d < startDay + 1) {
                let num = lastMonthEndDayCount - startDay + d
                calendarHtml += '<td class="is-disabled">' + num + '</td>'
            } else if (dayCount > endDayCount) {
                let num = dayCount - endDayCount
                calendarHtml += '<td class="is-disabled">' + num + '</td>'
                finishMonth = true
                dayCount++
            } else if ((d === Index.Sunday) || (d === Index.Saturday)) {
                calendarHtml += createCalendarHoliday(year, month, dayCount)
                dayCount++
            } else {
                calendarHtml += createCalendarWorkday(year, month, dayCount)
                dayCount++
            }
        }
        calendarHtml += '</tr>'

        if (Project.length > 0) {
            for (let i = 0; i < Project.length; i++) {
                calendarHtml += '<tr><td class="is-project">' + Project[i] + '</td>'
                for (let j = 1; j < weeks.length; j++) {
                    calendarHtml += '<td class="is-project"></td>'
                }
                calendarHtml += '</tr>'
            }
            w += Project.length
        }

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
