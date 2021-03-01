const EventDate = [
    {"id":0, "year":2021, "month":2, "day":5, "category":'A', "milestone":"ほげ"},
    {"id":1, "year":2021, "month":2, "day":10, "category":'B', "milestone":"ふが"},
    {"id":2, "year":2021, "month":2, "day":25, "category":'C', "milestone":"foo"},
    {"id":3, "year":2021, "month":2, "day":26, "category":'A', "milestone":"hoge"},
    {"id":4, "year":2021, "month":2, "day":28, "category":'A', "milestone":"ほげ"},
    {"id":5, "year":2021, "month":3, "day":5, "category":'B', "milestone":"ふが"},
    {"id":6, "year":2021, "month":3, "day":25, "category":'A', "milestone":"foo"},
    {"id":7, "year":2021, "month":3, "day":26, "category":'D', "milestone":"hoge"},
    {"id":8, "year":2021, "month":2, "day":25, "category":'A', "milestone":"ほげ"},
    {"id":9, "year":2021, "month":3, "day":1, "category":'B', "milestone":"ふが"},
    {"id":10, "year":2021, "month":3, "day":24, "category":'C', "milestone":"foo"},
    {"id":11, "year":2021, "month":4, "day":26, "category":'D', "milestone":"hoge"},
    {"id":12, "year":2021, "month":1, "day":1, "category":'D', "milestone":"hoge"},
    {"id":13, "year":2020, "month":12, "day":31, "category":'A', "milestone":"1231"}
]

const EventId = [
    {"refid":0, "dayafter":10, "milestone":"まいるすとーん1"},
    {"refid":2, "dayafter":20, "milestone":"マイルストーン2"}
]

// 以下は編集不要

let Events = EventDate

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

function generateEvent() {
    let newId = EventDate[EventDate.length - 1].id + 1
    for (let i = 0; i < EventId.length; i++) {
        for (let j = 0; j < EventDate.length; j++) {
            if (EventDate[j].id === EventId[i].refid) {
                let td = new Date(EventDate[j].year, EventDate[j].month - 1, EventDate[j].day)
                td.setDate(td.getDate() + EventId[i].dayafter)
                let te = {"id":newId, "year":td.getFullYear(), "month":td.getMonth() + 1, "day":td.getDate(), "category":EventDate[j].category, "milestone":EventId[i].milestone}
                Events.push(te)
                newId++
            }
        }
    }
}

generateEvent()
