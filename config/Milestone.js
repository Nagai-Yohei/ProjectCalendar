const MilestoneDate = [
    {"id":0, "year":2021, "month":2, "day":5, "project":'A', "milestone":"ほげほげほげ"},
    {"id":1, "year":2021, "month":2, "day":10, "project":'B', "milestone":"ふがふがふが"},
    {"id":2, "year":2021, "month":2, "day":25, "project":'C', "milestone":"foofoofoofoo"},
    {"id":3, "year":2021, "month":2, "day":26, "project":'A', "milestone":"hogehogehogehoge"}
]

const MilestoneId = [
    {"refid":0, "dayafter":10, "milestone":"まいるすとーん1"},
    {"refid":2, "dayafter":20, "milestone":"マイルストーン2"}
]

// 以下は編集不要

function getMilestone(year, month, day, project) {
    let ret = ''
    for (let i = 0; i < MilestoneDate.length; i++) {
        if (MilestoneDate[i].year === year && MilestoneDate[i].month === month && MilestoneDate[i].day === day && MilestoneDate[i].project === project) {
            ret = MilestoneDate[i].milestone
            break
        }
    }
    return ret
}
