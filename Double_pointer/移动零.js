// 题目地址： https://leetcode.cn/problems/move-zeroes/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    // 双指针
    // 需注意的点：当slow 和 fast 指向同一个元素时，并且该元素非0，不能粗暴地把nums[fast] 置为0；
    if (nums.indexOf(0) != -1) {
        let slow = 0;
        for (let fast = 0; fast < nums.length; fast++) {
            if (nums[fast] != 0) {
                if (fast != slow) { // 判断一下，如果俩指针指向同一位置，就不用互换了，只移动指针即可
                    let t = nums[slow];
                    nums[slow] = nums[fast];
                    nums[fast] = t;
                }
                slow++;
            }
        }
    }

    // 笨方法
    // for (let i = 0; i < nums.length; i++) {
    //     if (nums[i] == 0) {
    //         for (let j = i + 1; j < nums.length; j++) {
    //             if (nums[j] != 0) {
    //                 nums[i] = nums[j];
    //                 nums[j] = 0;
    //                 break;
    //             }
    //         }
    //     }
    // }
};