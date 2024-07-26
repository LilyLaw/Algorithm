// 大神视频：https://www.bilibili.com/video/BV1Zs4y1X7mN/
// 插入排序：取出一个数，依次和它之前的数比较，直到找到一个比它小的，插在它后面。
// 时间复杂度 O(n^2), 空间复杂度 O(1);
let nums = [-5, 9, 11, 13, 32, 4, 1, 10, 88, 2, 8, 3, 16, 14];

for(let i=0;i<nums.length-1;i++){
    let tmp = nums[i+1];
    let j = i+1;
    while(tmp < nums[j-1]){
        nums[j] = nums[j-1];
        j--;
    }
    nums[j] = tmp;
}
console.log(nums);