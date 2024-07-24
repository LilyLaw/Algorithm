// 题目地址： https://leetcode.cn/problems/find-all-duplicates-in-an-array/description/

// 中心思想：标记负数来表明已经访问过一次了。

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
    // 原地哈希
    let res = [];
    for (let i = 0; i < nums.length; i++) {
        let ind = Math.abs(nums[i]) -1;
        if(nums[ind] < 0){
            res.push(Math.abs(nums[i]))
        }else{
            nums[ind] = -nums[ind];
        }
    }
    return res;
};