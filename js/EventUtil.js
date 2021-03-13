function getEvent(year, month, day, category) {
    let ret = ''
    for (let i = 0; i < Events.length; i++) {
        if (Events[i].year === year && Events[i].month === month && Events[i].day === day && Events[i].category === category) {
            ret = Events[i].milestone
            break
        }
    }
    return ret
}

function getLastMonthEvent(year, month, day, category) {
    let ret = ''
    if (month === 1) {
        ret = getEvent(year - 1, 12, day, category)
    } else {
        ret = getEvent(year, month - 1, day, category)
    }
    return ret
}

function getNextMonthEvent(year, month, day, category) {
    let ret = ''
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
        if (eventHtml !== '') {
            calendarHtml += '<div class="event-string category cat' + i + '">' + eventHtml + '</div>'
        }
    }
    return calendarHtml
}

function getNextMonthEventHtml(year, month, day) {
    let calendarHtml = ''
    for (let i = 0; i < Category.length; i++) {
        let eventHtml = getNextMonthEvent(year, month, day, i)
        if (eventHtml !== '') {
            calendarHtml += '<div class="is-other-month event-string category cat' + i + '">' + eventHtml + '</div>'
        }
    }
    return calendarHtml
}

function getLastMonthEventHtml(year, month, day) {
    let calendarHtml = ''
    for (let i = 0; i < Category.length; i++) {
        let eventHtml = getLastMonthEvent(year, month, day, i)
        if (eventHtml !== '') {
            calendarHtml += '<div class="is-other-month event-string category cat' + i + '">' + eventHtml + '</div>'
        }
    }
    return calendarHtml
}

let Events = generateEvent(EventDate, EventId)
