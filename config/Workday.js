const Workday = [
    {"year":2021, "month":3, "day":27},
    {"year":2022, "month":3, "day":26}
]

function isWorkDay(year, month, day) {
    let ret = false
    for (let i = 0; i < Workday.length; i++) {
        ret = ret || (Workday[i].year === year && Workday[i].month === month && Workday[i].day === day)
    }
    return ret
}