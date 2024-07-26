// 大神视频：https://www.bilibili.com/video/BV1Zs4y1X7mN/
// 冒泡排序：比较相邻的两个数，如果前面的大于后面的，就交换两个的顺序，这样就能把大的数移到最后面
// 时间复杂度 O(n^2), 空间复杂度 O(1);
let nums = [9, 11, 13, 4, 6, 5, 7, 12, 1, 10, 15, 2, 8, 3, 16, 14];

for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i; j++) { // 注意j的取值范围
        if (nums[j] > nums[j + 1]) { // 重点是：相邻
            [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        }
    }
}
console.log(nums);