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

let Milestone = MilestoneDate

function getMilestone(year, month, day, project) {
    let ret = ''
    for (let i = 0; i < Milestone.length; i++) {
        if (Milestone[i].year === year && Milestone[i].month === month && Milestone[i].day === day && Milestone[i].project === project) {
            ret = Milestone[i].milestone
            break
        }
    }
    return ret
}

function generateMilestone() {
    let newId = MilestoneDate[MilestoneDate.length - 1].id + 1
    for (let i = 0; i < MilestoneId.length; i++) {
        for (let j = 0; j < MilestoneDate.length; j++) {
            if (MilestoneDate[j].id === MilestoneId[i].refid) {
                let targetDate = new Date(MilestoneDate[j].year, MilestoneDate[j].month - 1, MilestoneDate[j].day)
                targetDate.setDate(targetDate.getDate() + MilestoneId[i].dayafter)
                let targetMilestone = {"id":newId, "year":targetDate.getFullYear(), "month":targetDate.getMonth() + 1, "day":targetDate.getDate(), "project":MilestoneDate[j].project, "milestone":MilestoneId[i].milestone}
                Milestone.push(targetMilestone)
                newId++
            }
        }
    }
}

generateMilestone()
console.log(Milestone)
