// 题目地址：https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // 找到当前元素左侧元素最小值
    let min_p = prices[0];  // 记录最小值
    let max_cha = 0;    // 记录最大差值
    prices.forEach(item=>{
        max_cha = Math.max(max_cha, item - min_p);
        min_p = Math.min(min_p,item);
    })
    return max_cha;
};