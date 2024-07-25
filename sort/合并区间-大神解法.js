// 题目地址：https://leetcode.cn/problems/merge-intervals/description/

var merge = function (intervals) {
    // 先排序
    intervals.sort((a, b) => a[0] - b[0]);
    let res = [];
    for (let [a, b] of intervals) {
        let rl = res.length;
        if (rl && a <= res[rl - 1][1]) {
            res[rl - 1][1] = Math.max(b, res[rl - 1][1]);
        } else {
            res.push([a, b]);
        }
    }
    return res;
};