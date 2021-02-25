const EventDate = [
    {"id":0, "year":2021, "month":2, "day":5, "project":'A', "milestone":"ほげ"},
    {"id":1, "year":2021, "month":2, "day":10, "project":'B', "milestone":"ふが"},
    {"id":2, "year":2021, "month":2, "day":25, "project":'C', "milestone":"foo"},
    {"id":3, "year":2021, "month":2, "day":26, "project":'A', "milestone":"hoge"},
    {"id":4, "year":2021, "month":2, "day":28, "project":'A', "milestone":"ほげ"},
    {"id":5, "year":2021, "month":3, "day":5, "project":'B', "milestone":"ふが"},
    {"id":6, "year":2021, "month":3, "day":25, "project":'C', "milestone":"foo"},
    {"id":7, "year":2021, "month":3, "day":26, "project":'D', "milestone":"hoge"},
    {"id":8, "year":2021, "month":2, "day":25, "project":'A', "milestone":"ほげ"},
    {"id":9, "year":2021, "month":3, "day":1, "project":'B', "milestone":"ふが"},
    {"id":10, "year":2021, "month":3, "day":24, "project":'C', "milestone":"foo"},
    {"id":11, "year":2021, "month":4, "day":26, "project":'D', "milestone":"hoge"},
    {"id":12, "year":2021, "month":1, "day":1, "project":'D', "milestone":"hoge"},
    {"id":13, "year":2020, "month":12, "day":31, "project":'A', "milestone":"1231"}
]

const EventId = [
    {"refid":0, "dayafter":10, "milestone":"まいるすとーん1"},
    {"refid":2, "dayafter":20, "milestone":"マイルストーン2"}
]

// 以下は編集不要

let Events = EventDate

function getEvent(year, month, day, project) {
    let ret = ''
    for (let i = 0; i < Events.length; i++) {
        if (Events[i].year === year && Events[i].month === month && Events[i].day === day && Events[i].project === project) {
            ret = Events[i].milestone
            break
        }
    }
    return ret
}

function getLastMonthEvent(year, month, day, project) {
    let ret = ''
    if (month === 1) {
        ret = getEvent(year - 1, 12, day, project)
    } else {
        ret = getEvent(year, month - 1, day, project)
    }
    return ret
}

function getNextMonthEvent(year, month, day, project) {
    let ret = ''
    if (month === 12) {
        ret = getEvent(year + 1, 1, day, project)
    } else {
        ret = getEvent(year, month + 1, day, project)
    }
    return ret
}

function generateEvent() {
    let newId = EventDate[EventDate.length - 1].id + 1
    for (let i = 0; i < EventId.length; i++) {
        for (let j = 0; j < EventDate.length; j++) {
            if (EventDate[j].id === EventId[i].refid) {
                let targetDate = new Date(EventDate[j].year, EventDate[j].month - 1, EventDate[j].day)
                targetDate.setDate(targetDate.getDate() + EventId[i].dayafter)
                let targetEvent = {"id":newId, "year":targetDate.getFullYear(), "month":targetDate.getMonth() + 1, "day":targetDate.getDate(), "project":EventDate[j].project, "milestone":EventId[i].milestone}
                Event.push(targetEvent)
                newId++
            }
        }
    }
}

generateEvent()
