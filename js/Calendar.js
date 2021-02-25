
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1
const config = {
    show: 2,
}
const Index = {
    Category: 0,
    Sunday: 1,
    Monday: 2,
    Tuesday: 3,
    Wednesday: 4,
    Thursday: 5,
    Friday: 6,
    Saturday: 7,
}

function getTdTag(isHoliday, isCategory, isDisabled) {
    let tag = ''
    if (isHoliday || isCategory || isDisabled) {
        tag = '<td class="'
        if (isHoliday) {
            tag += ' is-holiday'
        }
        if (isCategory) {
            tag += ' is-category'
        }
        if (isDisabled) {
            tag += ' is-disabled'
        }
        tag += '">'
    } else {
        tag = '<td>'
    }
    return tag
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

function createCalendar(year, month) {
    const weeks = ['Category', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
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
        let dayCountBase = dayCount
        let dayCountUp = true
        for (let d = Index.Sunday; d < weeks.length; d++) {
            if (w == 0 && d < startDay + 1) {
                let num = lastMonthEndDayCount - startDay + d
                calendarHtml += getTdTag(false, false, true) + num + '</td>'
                dayCountUp = false
            } else if (dayCount > endDayCount) {
                let num = dayCount - endDayCount
                calendarHtml += getTdTag(false, false, true) + num + '</td>'
                finishMonth = true
            } else if ((d === Index.Sunday) || (d === Index.Saturday)) {
                calendarHtml += getTdTag(!isWorkDay(year, month, dayCount), false, false) + dayCount + '</td>'
            } else {
                calendarHtml += getTdTag(isHoliday(year, month, dayCount), false, false) + dayCount + '</td>'
            }
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

        if (Category.length > 0) {
            for (let i = 0; i < Category.length; i++) {
                calendarHtml += '<tr>' + getTdTag(false, true, false) + Category[i] + '</td>'
                let dayCountUp = true
                let day = dayCountBase
                for (let d = Index.Sunday; d < weeks.length; d++) {
                    let EventHtml = getEvent(year, month, day, Category[i])
                    if (w == 0 && d < startDay + 1) {
                        let num = lastMonthEndDayCount - startDay + d
                        calendarHtml += getTdTag(false, true, true) + getLastMonthEvent(year, month, num, Category[i]) + '</td>'
                        dayCountUp = false
                    } else if (day > endDayCount) {
                        let num = day - endDayCount
                        calendarHtml += getTdTag(false, true, true) + getNextMonthEvent(year, month, num, Category[i]) + '</td>'
                    } else if ((d === Index.Sunday) || (d === Index.Saturday)) {
                        calendarHtml += getTdTag(!isWorkDay(year, month, day), true, false) + EventHtml + '</td>'
                    } else {
                        calendarHtml += getTdTag(isHoliday(year, month, day), true, false) + EventHtml + '</td>'
                    }
                    if (dayCountUp) {
                        day++
                    } else {
                        dayCountUp = true
                    }
                }
                calendarHtml += '</tr>'
            }
            w += Category.length
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
