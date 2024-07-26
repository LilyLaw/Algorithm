// 题目地址：https://leetcode.cn/problems/3sum-closest/description/

var threeSumClosest = function (nums, target) {
    // 最接近 Math.abs(a-b) 最小
    let zjj = nums[0] + nums[1] + nums[2];
    nums = nums.sort((a, b) => a - b);
    // 双指针
    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];
            if (Math.abs(sum - target) < Math.abs(zjj - target)) {
                zjj = sum;
            }
            if (sum < target) {
                left++;
            } else if (sum > target) {
                right--;
            } else if (sum == target) { // 如果等于，说明差值为0， 则最为接近，直接return 出去
                return sum;
            }
        }
    }
    return zjj;
};