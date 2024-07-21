// 题目地址：https://leetcode.cn/problems/house-robber/

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    let dp = [];
    for (let i = 0; i < nums.length; i++) {
        if (i == 0) {
            dp[0] = nums[0];
        } else {
            let qu = i == 1 ? nums[i] : (dp[i - 2] + nums[i]);
            let buqu = dp[i - 1];
            dp[i] = Math.max(qu, buqu);
        }
    }
    return dp[dp.length-1];
};