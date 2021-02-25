const Holiday = [
    {"year":2021, "month":2, "day":11},
    {"year":2021, "month":2, "day":23},
    {"year":2021, "month":4, "day":29},
    {"year":2021, "month":4, "day":30},
    {"year":2021, "month":5, "day":3},
    {"year":2021, "month":5, "day":4},
    {"year":2021, "month":5, "day":5},
    {"year":2021, "month":7, "day":22},
    {"year":2021, "month":7, "day":23},
    {"year":2021, "month":8, "day":9},
    {"year":2021, "month":8, "day":10},
    {"year":2021, "month":8, "day":11},
    {"year":2021, "month":8, "day":12},
    {"year":2021, "month":8, "day":13},
    {"year":2021, "month":9, "day":20},
    {"year":2021, "month":11, "day":3},
    {"year":2021, "month":11, "day":23},
    {"year":2021, "month":12, "day":29},
    {"year":2021, "month":12, "day":30},
    {"year":2021, "month":12, "day":31},
    {"year":2022, "month":1, "day":3},
    {"year":2022, "month":1, "day":4},
    {"year":2022, "month":1, "day":5},
    {"year":2022, "month":1, "day":10},
    {"year":2022, "month":2, "day":11},
    {"year":2022, "month":2, "day":23}
]

// 以下は編集不要

function isHoliday(year, month, day) {
    let ret = false
    for (let i = 0; i < Holiday.length; i++) {
        ret = ret || (Holiday[i].year === year && Holiday[i].month === month && Holiday[i].day === day)
    }
    return ret
}
