// 大神视频：https://www.bilibili.com/video/BV1Zs4y1X7mN/
// 选择排序: 每次都选出最小的，和第i个交换
// 时间复杂度 O(n^2), 空间复杂度 O(1);
let nums = [8, 5, 6, 4, 3, 7, 10, 2];

for (let i = 0; i < nums.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < nums.length; j++) {
        if (nums[j] < nums[min]) {
            min = j;
        }
    }
    if (min != i) { // 判断一下，不做无效交换
        [nums[i], nums[min]] = [nums[min], nums[i]]
    }
}
console.log(nums);